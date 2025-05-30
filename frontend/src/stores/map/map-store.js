import { defineStore, acceptHMRUpdate } from 'pinia';

export const useMapStore = defineStore('map', () => {

    const destination = ref('');
    const location = ref('');

    return {
        destination,
        location,
    };

});

if(import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMapStore, import.meta.hot));
}