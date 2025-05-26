<template>
    <div class="ml-4 mr-4">

        <h1 class="text-2xl mb-4">Trucks</h1>

        <UploadImageModal 
            v-show="uploadImageVehicleModal"
            :show="uploadImageVehicleModal"
        />

        <VehicleModal 
            v-show="modalVal"
            :show="modalVal" 
            :loading="loading"
            @toggleModal="vehicleStore.toggleModal" 
            />
        
        <VehicleTable 
            @toggleModal="vehicleStore.toggleModal"
            @editVehicle="editVehicle"
            @removeVehicle="removeVehicle"
            :vehicles="vehicleData" 
            @uploadImage="uploadImage"
        />

    </div>
</template>

<style scoped>
/* pagination styles */
button.relative.inline-flex.items-center.px-4.py-2.text-sm.font-medium.border.focus\:z-20.bg-blue-50.border-blue-500.text-blue-600.z-30 {
    background: #4f46e5;
    color: white;
    /* border-radius: 5px; */
}
</style>

<script setup>
import VehicleTable from './components/VehicleTable.vue';
import { onMounted } from 'vue';
import { useVehicleStore } from '@/stores/vehicle/vehicle-store';
import { useUploadVehicleImageStore } from '@/stores/vehicle/upload-vehicle-image-store';

import VehicleModal from './components/VehicleModal.vue';
import { storeToRefs } from 'pinia';
import { promptUser } from "../../../helper/utils";
import UploadImageModal from './components/UploadImageModal.vue';

const vehicleStore = useVehicleStore();
const { vehicleData, modalVal, edit, vehicleInput } = storeToRefs(vehicleStore);
const uploadVehicleImageStore = useUploadVehicleImageStore();
const {modalVal:uploadImageVehicleModal, uploadImageInput} = storeToRefs(uploadVehicleImageStore);


function editVehicle(vehicle) {
    vehicleInput.value = vehicle;
    modalVal.value = true;
    edit.value = true;
}

function uploadImage(id) {
    uploadImageInput.value.id = id;
    uploadImageVehicleModal.value = true;
}

function removeVehicle(id) {
    promptUser().then(async () => {
        await vehicleStore.deleteVehicle(id);
        vehicleStore.getVehicles();
    });
}

onMounted(async () => {
  await vehicleStore.getVehicles(); // <- this actually fetches data
  console.log('vehicleData after fetch:', vehicleData.value);
});

</script>

