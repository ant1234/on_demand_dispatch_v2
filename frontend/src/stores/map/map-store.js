import { getUserData, showError, successMsg } from '@/helper/utils';
import { postData, getData } from '@/helper/http';
import { ONGOING_STATUS, PENDING_STATUS } from '@/constants/trip-status'
import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import { DRIVER_ROLE } from '@/constants/roles';

export const useMapStore = defineStore('map', () => {

  const customerDestination = ref([]);
  const customerLocation = ref([]);
  const queryDestinationMap = ref('');
  const queryLocationMap = ref('');
  const driverLocation = ref({});
  const loading = ref(false);
  const vehicleId = ref(null);
  const customerTripData = ref({});
  const driverLocationForCustomer = ref([]);
  const customerLocationForDriver = ref([]);
  const notificationVal = ref(0);
  const allCustomerTripData=ref([]);

  const getCustomerLocationCoordinates = () => ({
    latitude: customerLocation.value?.[1],
    longitude: customerLocation.value?.[0],
    place: queryLocationMap.value,
  });

  const getCustomerDestinationCoordinates = () => ({
    latitude: customerDestination.value?.[1],
    longitude: customerDestination.value?.[0],
    place: queryDestinationMap.value,
  });

  const getDriverLocationCoordinates = () => ({
    latitude: driverLocation.value?.geometry?.coordinates?.[1],
    longitude: driverLocation.value?.geometry?.coordinates?.[0],
    place: driverLocation.value?.place_name || '',
  });

  async function storeDriverLocation() {
      const { longitude, latitude, place } = getDriverLocationCoordinates();
      const userData = getUserData();
      if (
          typeof longitude === "undefined" ||
          typeof latitude === "undefined"
      ) {
          showError("Please select a location !");
      } else {
          try {
              loading.value = true;
              const data = await postData(`/driver_location`, {
                  user_id: userData?.user.id,
                  longitude: longitude,
                  latitude: latitude,
                  address: place,
              });
              successMsg(data?.message);
              loading.value = false;
          } catch (errors) {
              loading.value = false;
              for (const message of errors) {
                  showError(message);
              }
          }
      }
  }

  function listenCustomerLocationInRealTime(){
    const userData = getUserData()
    window.Echo.channel("customerLocation").listen(
        "CustomerLocationEvent",
        (event) => {
            const newCustomerLocation=event.customerLocation
          
            const newArr= customerLocationForDriver.value.filter((customer)=>customer.user_id!==newCustomerLocation.user_id)
            let newData=[...newArr, event.customerLocation]
            customerLocationForDriver.value=[...newData]
            if(userData?.user?.role===DRIVER_ROLE){
                notificationVal.value++

            }
            successMsg('Customer location changed !')
        
        }
    );
  }

  async function getAllCustomerTrips(userId) {
      
      try {
          loading.value = true;
          const data = await getData(
              `/all_customer_trips?user_id=${userId}`
          );
          loading.value = false;
          if (Array.isArray(data) && data.length === 0) {
              allCustomerTripData.value=[]
          } else {
              listenCustomerLocationInRealTime()
              allCustomerTripData.value=data
          }
      } catch (errors) {
          loading.value = false;
          for (const message of errors) {
              showError(message);
          }
      }
  }


  function validateBooking() {
    return new Promise((resolve) => {
      const location = getCustomerLocationCoordinates();
      const destination = getCustomerDestinationCoordinates();
  
      if (!location || !destination) {
        showError("Location or destination is missing!");
        return resolve(false);
      }
  
      const { latitude: latitudeL } = location;
      const { longitude: longitudeD } = destination;
  
      if (typeof vehicleId.value === "object" || vehicleId.value === "") {
        showError("Please select a vehicle or Taxi !");
        return resolve(false);
      }
  
      if (
        typeof longitudeD === "undefined" ||
        typeof latitudeL === "undefined"
      ) {
        showError("Please select a location !");
        return resolve(false);
      }
  
      return resolve(true);
    });
  }
  

  async function storeCustomerLocation() {

      const location = getCustomerLocationCoordinates();
      const destination = getCustomerDestinationCoordinates();
      
      if (!location || !destination) {
          showError("Missing coordinates!");
          return;
      }
      
      const {
          place: placeL,
          longitude: longitudeL,
          latitude: latitudeL,
      } = location;
      
      const {
          place: placeD,
          longitude: longitudeD,
          latitude: latitudeD,
      } = destination;

      const userData = getUserData();

      try {
          loading.value = true;
          const data = await postData(`/customer_trip`, {
              user_id: userData?.user.id,

              location_address: placeL,
              location_latitude: latitudeL,
              location_longitude: longitudeL,
              destination_address: placeD,
              destination_latitude: latitudeD,
              destination_longitude: longitudeD,
              trip_status: PENDING_STATUS,
              vehicle_id: vehicleId.value,
          });
          successMsg(data?.message);
          loading.value = false;
      } catch (errors) {
        loading.value = false;
        if (Array.isArray(errors)) {
          for (const message of errors) {
            showError(message);
          }
        } else if (errors instanceof Error) {
          showError(errors.message);
        } else {
          showError('Unknown error occurred');
        }
      }
  }

  // 

  async function getCustomerLocationForDriver() {

      try {
          loading.value = true;
          const data = await getData(
              `/customer_location/driver`
          );
          loading.value = false;
          if (Array.isArray(data) && data.length === 0) {
              customerLocationForDriver.value=[]
          } else {
              listenCustomerLocationInRealTime()
              customerLocationForDriver.value=data
          }
      } catch (errors) {
          loading.value = false;
          for (const message of errors) {
              showError(message);
          }
      }
  }


  async function getDriverLocationForCustomer() {
    try {
      loading.value = true;
      const data = await getData('/driver_location/customer');
  
      if (Array.isArray(data) && data.length > 0) {
        driverLocationForCustomer.value = data;
      } else {
        listenDriverLocationInRealTime();
        driverLocationForCustomer.value = [];
      }
  
    } catch (error) {
      console.error('Error fetching driver location:', error);
      driverLocationForCustomer.value = [];
    } finally {
      loading.value = false;
    }
  }

  function listenDriverLocationInRealTime() {
    window.Echo.channel('driverLocation')
      .listen('DriverLocationEvent', (e) => {
        driverLocation.value = e.data;
      });
  }

  async function getDriverLocation() {
    const userData = getUserData();
    try {
        loading.value = true;
        const data = await getData(`/get_driver_location?user_id=${userData?.user?.id}`);

        if(Array.isArray(data) || data?.data?.length === 0) {
            window.location.href = '/profile';
        } else {
            driverLocation.value = data?.data || {};
            loading.value = false;
        }

    } catch (error) {
        loading.value = false;
        console.error('Error fetching user data:', error);
    }
  }

  async function getCustomerTripData() {
    const userData = getUserData();

    try {
        loading.value = true;
        const data = await getData(
            `/customer_trip?user_id=${userData?.user?.id}&trip_status=${ONGOING_STATUS}`
        );
        loading.value = false;
        if (Array.isArray(data) && data.length === 0) {
            window.location.href = "/app/welcome";
        } else {
            customerTripData.value = data;
            loading.value = false;
        }
    } catch (errors) {
        loading.value = false;
        for (const message of errors) {
            showError(message);
        }
    }
}


  return {
    storeDriverLocation,
    storeCustomerLocation,
    validateBooking,
    getDriverLocation,
    getCustomerDestinationCoordinates,
    getCustomerLocationCoordinates,
    getDriverLocationCoordinates,
    getCustomerTripData,
    getDriverLocationForCustomer,
    getCustomerLocationForDriver,
    getAllCustomerTrips,
    notificationVal,
    allCustomerTripData,
    customerLocationForDriver,
    driverLocationForCustomer,
    queryDestinationMap,
    queryLocationMap,
    driverLocation,
    vehicleId,
    customerTripData,
    customerDestination,
    customerLocation,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMapStore, import.meta.hot));
}
