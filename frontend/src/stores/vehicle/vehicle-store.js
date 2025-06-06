import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import { getData, postData, putData, deleteData } from '@/helper/http';
import { useVuelidate } from '@vuelidate/core'
import { required, numeric } from '@vuelidate/validators'
import { successMsg } from '@/helper/utils';


export const useVehicleStore = defineStore('vehicle', () => {

    const vehicleData = ref({});
    const vehicleInput = ref({name: "", model: "", price: ""});
    const loading = ref(false);
    const modalVal = ref(false);
    const edit = ref(false);
    const places = ref({});

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
                         editVehicle
                        : createVehicle();
            vehicleValidation$.value.$reset();
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

    async function getPlaces(query="") {

        try {
            loading.value = true;
            const data = await getData(`/places?query=${query}`);
            places.value = data?.features;
            loading.value = false;
        } catch (error) {
            loading.value = false;
            console.error('Error fetching map data:', error);
        }
    }

    async function editVehicle(){
        const data= await putData(`/vehicles`,{...vehicleInput.value})
         modalVal.value=false
         edit.value=false
         vehicleInput.value={}
         getVehicles
         return data
     }
 
     async function createVehicle(){
         const data=await postData(`/vehicles`,{...vehicleInput.value});
         vehicleInput.value={}
         edit.value=false
         getVehicles()
         return data
     }
    async function deleteVehicle(id) {
      
        try {
            loading.value = true;
        const data= await deleteData(`/vehicles`,{id: id});
           successMsg(data?.message)
           loading.value = false;
        } catch (err) {
            loading.value = false;
            console.error('Error fetching vehicle data:', err);
        }
    }

    return {
        vehicleData,
        edit,
        loading,
        modalVal,
        vehicleInput,
        vehicleValidation$,
        places,
        getPlaces,
        deleteVehicle,
        editVehicle,
        createVehicle,
        getVehicles,
        toggleModal,
        createOrUpdateVehicle,
    };

});

if(import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useVehicleStore, import.meta.hot));
}