<template>
    <div class="ml-4 mr-4">

        <h1 class="text-2xl mb-4">Trucks Page</h1>

        <VehicleTable 
            :vehicles="vehicleData?.data" 
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
import { storeToRefs } from 'pinia';

const vehicleStore = useVehicleStore();
const { vehicleData } = storeToRefs(vehicleStore);

onMounted(async () => {
    // await userStore.getUsers();
});
</script>

