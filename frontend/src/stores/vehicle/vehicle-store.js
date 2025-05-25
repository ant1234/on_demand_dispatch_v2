import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import { getData } from '@/helper/http';


export const useVehicleStore = defineStore('vehicle', () => {

    const vehicleData = ref({});

    const loading = ref(false);

    // const modalVal = ref(false);

    // function toggleModal(id) {
    //     modalVal.value = !modalVal.value;
    //     userId.value = id;
    // }

    // async function modifyRole(role) {

    //     try {
    //         loading.value = true;
    //         const data = await postData(`/users/modify-role`, {
    //             role: role,
    //             userId: userId.value, 
    //         });
    //         successMsg(data?.message);
    //         userData.value = data;
    //         loading.value = false;
    //         getUsers();
    //     } catch (error) {
    //         loading.value = false;
    //         console.error('Error fetching user data:', error);
    //     }
    // }

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
        getVehicles,
    };

});

if(import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useVehicleStore, import.meta.hot));
}