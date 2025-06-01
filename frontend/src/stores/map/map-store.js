// import { get } from 'core-js/core/dict';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';

export const useMapStore = defineStore('map', () => {

    const destination = ref({});
    const location = ref({});

    function getLocationCoordinates() {

      const longitude = location?.value?.properties?.longitude || 0;
      const latitude = location?.value?.properties?.latitude || 0;
      const place = location?.value?.properties?.place_formatted || 0;

        return {
            latitude: latitude,
            longitude: longitude,
            place: place,
        };
    }

    function getDestinationCoordinates() {

      const longitude = location?.value?.properties?.longitude || 0;
      const latitude = location?.value?.properties?.latitude || 0;
      const place = location?.value?.properties?.place_formatted || 0;

        return {
            latitude: latitude,
            longitude: longitude,
            place: place,
        };
    }

    return {
        destination,
        location,
        getLocationCoordinates,
        getDestinationCoordinates,
    };

});

if(import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMapStore, import.meta.hot));
}