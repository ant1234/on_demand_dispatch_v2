import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import { getData, postData, putData } from '@/helper/http';
import { useVuelidate } from '@vuelidate/core'
import { required, numeric } from '@vuelidate/validators'
import { successMsg } from '@/helper/utils';


export const useVehicleStore = defineStore('vehicle', () => {

    const vehicleData = ref({});
    const vehicleInput = ref({name: "", model: "", price: ""});
    const loading = ref(false);
    const modalVal = ref(false);
    const edit = ref(false);

    const rules = {
        name: { required },
        price: { required, numeric },
        model: { required },
    };
    
    const vehicleValidation$ = useVuelidate(rules, vehicleInput);
    
    async function createOrUpdateVehicle() {

        const isValid = await vehicleValidation$.value.$validate();

        if (!isValid) {
            return;
        }

        try {
            loading.value = true;
            const data = edit.value ? 
                        await putData(`/vehicles`, { ...vehicleInput.value })
                        : await postData(`/vehicles`, { ...vehicleInput.value });
            vehicleValidation$.value.$reset();
            vehicleInput.value = {};
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
        edit,
        loading,
        modalVal,
        vehicleInput,
        vehicleValidation$,
        getVehicles,
        toggleModal,
        createOrUpdateVehicle,
    };

});

if(import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useVehicleStore, import.meta.hot));
}