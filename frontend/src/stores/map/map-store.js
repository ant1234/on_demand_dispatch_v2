import { getUserData, showError, successMsg } from '@/helper/utils';
import { postData, getData } from '@/helper/http';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import { PENDING_STATUS } from '@/constants/trip-status';


export const useMapStore = defineStore('map', () => {

  const customerDestination = ref([]);
  const customerLocation = ref([]);
  const queryDestinationMap = ref('');
  const queryLocationMap = ref('');
  const driverLocation = ref({});
  const loading = ref(false);
  const vehicleId = ref(null);
  const customerTripData = ref({});

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

  function validateBooking() {
    let error=0;
    return new Promise((resolve) => {
        const { latitude: latitudeL } = getCustomerLocationCoordinates();
        const { longitude: longitudeD } = getCustomerDestinationCoordinates();

        if (typeof vehicleId.value === "object" || vehicleId.value === "") {
            showError("Please select a vehicle or Taxi !");
            error++
            resolve(false);
        } 

        if (
            typeof longitudeD === "undefined" ||
            typeof latitudeL === "undefined"
        ) {
            error++
            showError("Please select a location !");
            resolve(false);
        }

        if(error===0){
            resolve(true)
        }
    });
  }

  async function storeCustomerLocation() {
      const {
          place: placeL,
          longitude: longitudeL,
          latitude: latitudeL,
      } = getCustomerLocationCoordinates();
      const {
          place: placeD,
          longitude: longitudeD,
          latitude: latitudeD,
      } = getCustomerDestinationCoordinates();

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
        const data = await getData(`/customer_trip?user_id=${userData?.user?.id}&vehicle_id=${vehicleId.value}`);

        if(Array.isArray(data) || data?.data?.length === 0) {
            window.location.href = '/welcome';
        } else {
            customerTripData.value = data?.data || {};
            loading.value = false;
        }

    } catch (error) {
        loading.value = false;
        console.error('Error fetching user data:', error);
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
