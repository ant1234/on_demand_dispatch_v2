import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref, computed } from 'vue';

export const useMapStore = defineStore('map', () => {
  const destination = ref([]);
  const location = ref([]);
  const queryDestination = ref('');
  const queryLocation = ref('');

  const getLocationCoordinates = () => ({
    latitude: location.value?.[1],
    longitude: location.value?.[0],
    place: queryLocation.value,
  });

  const getDestinationCoordinates = () => ({
    latitude: destination.value?.[1],
    longitude: destination.value?.[0],
    place: queryDestination.value,
  });

  const placeLocation = computed(() => queryLocation.value);
  const placeDestination = computed(() => queryDestination.value);

  return {
    destination,
    location,
    queryDestination,
    queryLocation,
    getLocationCoordinates,
    getDestinationCoordinates,
    placeLocation,
    placeDestination,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMapStore, import.meta.hot));
}
