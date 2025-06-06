import { getUserData, showError, successMsg } from '@/helper/utils';
import { postData, getData } from '@/helper/http';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';


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

    const {latitude, longitude, place} = getDriverLocationCoordinates();
    const userData = getUserData();

    if (latitude === 'undefined' || longitude === 'undefined') {
        showError('Please provide valid coordinates and place.');
    } else {

      try {
        loading.value = true;
        const data = await postData(`/driver_location`, {
            user_id: userData?.user?.id,
            longitude: longitude,
            latitude: latitude,
            address: place,
        });
        successMsg(data?.message);
        loading.value = false;
      } catch (error) {
          loading.value = false;
          console.error('Error fetching user data:', error);
      }
    }
  }

  async function storeCustomerLocation() {

    const { latitude: pickupLat, longitude: pickupLng, place: pickupPlace } = getCustomerLocationCoordinates();
    const { latitude: dropLat, longitude: dropLng, place: dropPlace } = getCustomerDestinationCoordinates();
    const userData = getUserData();

    if (latitude === 'undefined' || longitude === 'undefined') {
        showError('Please provide valid coordinates and place.');
    } else {

      try {
        loading.value = true;
        const data = await postData(`/customer_location`, {
            user_id: userData?.user?.id,
            longitude: longitude,
            latitude: latitude,
            address: place,
        });
        successMsg(data?.message);
        loading.value = false;
      } catch (error) {
          loading.value = false;
          console.error('Error fetching user data:', error);
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
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMapStore, import.meta.hot));
}
