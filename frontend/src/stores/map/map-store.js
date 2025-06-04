import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';

export const useMapStore = defineStore('map', () => {

  const customerDestination = ref([]);
  const customerLocation = ref([]);
  const queryDestinationMap = ref('');
  const queryLocationMap = ref('');
  const driverLocation = ref({});

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

  return {
    getCustomerDestinationCoordinates,
    getCustomerLocationCoordinates,
    getDriverLocationCoordinates,
    queryDestinationMap,
    queryLocationMap,
    driverLocation,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMapStore, import.meta.hot));
}
