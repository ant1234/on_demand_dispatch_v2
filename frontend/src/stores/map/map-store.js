import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';

export const useMapStore = defineStore('map', () => {
  const destination = ref([]);
  const location = ref([]);
  const queryDestinationMap = ref('');
  const queryLocationMap = ref('');
  const driverLocation = ref({
    latitude: 0,
    longitude: 0,
    place: '',
  });

  const getLocationCoordinates = () => ({
    latitude: location.value?.[1],
    longitude: location.value?.[0],
    place: queryLocationMap.value,
  });

  const getDestinationCoordinates = () => ({
    latitude: destination.value?.[1],
    longitude: destination.value?.[0],
    place: queryDestinationMap.value,
  });

  return {
    destination,
    location,
    queryDestinationMap,
    queryLocationMap,
    driverLocation,
    getLocationCoordinates,
    getDestinationCoordinates,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMapStore, import.meta.hot));
}
