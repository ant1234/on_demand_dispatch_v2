import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import { getData, postData } from '@/helper/http';
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { successMsg } from '@/helper/utils';


export const useVehicleStore = defineStore('vehicle', () => {

    const vehicleData = ref({});
    const vehicleInput = ref({name: "", model: "", price: ""});
    const loading = ref(false);
    const modalVal = ref(false);

    const rules = {
        name: { required },
        price: { required },
        model: { required },
    };
    
    const vehicleValidation$ = useVuelidate(rules, vehicleInput);
    
    async function createVehicle() {

        const isValid = await vehicleValidation$.value.$validate();

        if (!isValid) {
            return;
        }

        try {
            loading.value = true;
            const data = await postData(`/vehicles`, { ...vehicleInput.value });
            successMsg(data?.message);
            loading.value = false;
        } catch (error) {
            loading.value = false;
            console.error('Error fetching vehicle data:', error);
        }
    }

    function toggleModal() {
        modalVal.value = !modalVal.value;
    }

    async function getVehicles() {

        try {
            loading.value = true;
            const data = await getData(`/vehicles`);
            vehicleData.value = data;
            loading.value = false;
        } catch (error) {
            loading.value = false;
            console.error('Error fetching vehicle data:', error);
        }
    }

    return {
        vehicleData,
        loading,
        modalVal,
        vehicleInput,
        vehicleValidation$,
        getVehicles,
        toggleModal,
        createVehicle,
    };

});

if(import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useVehicleStore, import.meta.hot));
}