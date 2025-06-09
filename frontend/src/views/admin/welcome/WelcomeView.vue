<template>
    <div class="bg-white flex flex-col p-2">

        <div class="flex">
            <div class="flex flex-col mr-20">
            <!-- Call to action -->
            <img src="@/assets/taxi/cab-booking.png" alt="Booking" />        
            </div>
            <div class="ml-20">
                <h1 class="text-2xl mb-10 mt-10 font-semibold">
                        Trust the leading and the most reliable <br />
                        US taxi operator.
                </h1>
                <div class="flex flex-col mb-2">
                    <select @change="selectVehicleId" name="" id="" class="mb-2 border rounded-md py-2 px-2 w-[100%]">
                        <option value="">Select Taxi</option>
                        <option 
                            v-for="vehicle in vehicleData" 
                            :key="vehicle?.id" :value="vehicle?.id">{{ vehicle?.name}} - {{ vehicle?.model }}</option>
                    </select>
                </div>
                <div class="flex gap-2 mb-2">
                    <SelectLocationInput 
                    @selectPlace="selectLocation"
                    v-model="queryLocation"  
                    :places="vehicleStore.places"
                    :placeholder="'Enter Pickup Location'"
                    />

                    <SelectDestinationInput 
                    @selectPlace="selectDestination"
                    v-model="queryDestination" 
                    :places="vehicleStore.places"
                    :placeholder="'Enter Drop Location'"
                    />

                </div>
                <button
                    v-show="_hideBookButton"
                    @click="bookDriver"
                    class="flex justify-center font-semibold rounded-md bg-indigo-700 text-white px-2 py-2 w-[100%]"
                >
                    <span class="">Book driver now</span>
                    <ArrowRightIcon class="pt-1" />
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-2 gap-2">
            <VehicleList 
                :vehicles="vehicleData" 
                :hideBookButton = "_hideBookButton"
            />
        </div>
    </div>
</template>


<script setup>
// import { App } from "@/api/api.js";
import SelectLocationInput from './components/SelectLocationInput.vue';
import SelectDestinationInput from './components/SelectDestinationInput.vue';

import { useVehicleStore } from '@/stores/vehicle/vehicle-store';
import { useAutoCompleteStore } from '@/stores/vehicle/auto-complete-store';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import VehicleList from './components/VehicleList.vue';
import { useMapStore } from '@/stores/map/map-store';
import { useRouter } from 'vue-router';
import { hideBookButton } from "../../../middleware/hideBookButton";
// import { map } from 'core-js/core/array';

const autoCompleteStore = useAutoCompleteStore();
const { showSuggestionsLocation, 
        showSuggestionsDestination,
        queryDestination,
        queryLocation
      } = storeToRefs(autoCompleteStore);

const vehicleStore = useVehicleStore();
const mapStore = useMapStore();
const { vehicleData } = storeToRefs(vehicleStore);
const { customerDestination, customerLocation, queryLocationMap, queryDestinationMap, vehicleId } = storeToRefs(mapStore);

function selectVehicleId(event){
    const val = event.target.value;
    vehicleId.value = val;
}


function selectLocation(place) {
  if (place?.geometry?.coordinates) {
    customerLocation.value = place.geometry.coordinates;
    queryLocationMap.value = place.place_name; // Map label
    queryLocation.value = place.place_name;     // Input field text
    showSuggestionsLocation.value = false;
  }
}

function selectDestination(place) {
  if (place?.geometry?.coordinates) {
    customerDestination.value = place.geometry.coordinates;
    queryDestinationMap.value = place.place_name; // Map label
    queryDestination.value = place.place_name;     // Input field text
    showSuggestionsDestination.value = false;
  }
}

const Router = useRouter();

async function bookDriver() {

    const data = await mapStore.validateBooking();
    if(data === true) {
        mapStore.storeCustomerLocation();
        Router.push('/customer_map');
    }
}

const _hideBookButton = ref(hideBookButton());

onMounted(async () => {
    await vehicleStore.getVehicles();
});
</script>