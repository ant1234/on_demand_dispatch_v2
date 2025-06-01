import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
// import { getUserData } from "../../helper/utils";

export const useAutoCompleteStore = defineStore('auth-complete', () => {

    const queryLocation = ref('');
    const queryDestination = ref('');
    const showSuggestionsLocation = ref(false);
    const showSuggestionsDestination = ref(false);


    return {
        queryLocation,
        queryDestination,
        showSuggestionsLocation,
        showSuggestionsDestination
    };

});

if(import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAutoCompleteStore, import.meta.hot));
}