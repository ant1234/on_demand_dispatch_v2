<template>
    <div class="relative w-full max-w-s">
        <div class="relative">
            <span class="absolute top-2 left-1">
                <MapPinIcon class="" />
            </span>
            <input 
                v-model="queryDestination"
                @focus="showSuggestionsDestination = true"
                @blur="hideSuggestions"
                @keydown="search"
                type="text" 
                :placeholder="placeholder" 
                class="mb-2 border rounded-md focus:ring focus:ring-blue-200 py-2 px-7 w-[100%]" />

            <span v-show="loading" class="absolute top-1 right-2">
                <img src="@/assets/spinner.gif" width="30" alt="spinner" />        
            </span>
        </div>
        <ul v-show="showSuggestionsDestination" class="w-full rounded-md shadow-lg z-10 bg-white border border-gray-200 max-h-48 absolute overflow-y-auto">
            
            <li v-for="place in places" 
                :key="place?.place_name" 
                @click="selectPlace(place)"
                class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <span>{{ place?.place_name }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup>
// import { ref } from 'vue';
import  { storeToRefs } from 'pinia';
import { useVehicleStore } from '@/stores/vehicle/vehicle-store';
import { useAutoCompleteStore } from '@/stores/vehicle/auto-complete-store';
import { _debounce } from '@/helper/utils';


const autoCompleteStore = useAutoCompleteStore();
const { queryDestination, showSuggestionsDestination } = storeToRefs(autoCompleteStore);
const vehicleStore = useVehicleStore();
const { places, loading } = storeToRefs(vehicleStore);

defineProps(['placeholder']);
defineEmits(['selectPlace']);

const search = _debounce(async () => {
        await vehicleStore.getPlaces(queryDestination.value);
}, 500);

function hideSuggestions() {
    setTimeout(() => {
        showSuggestionsDestination.value = false;
    }, 100);
}
</script>