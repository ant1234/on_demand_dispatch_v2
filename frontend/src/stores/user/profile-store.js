import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import { postData } from '@/helper/http';
import { successMsg } from '@/helper/utils';


export const useProfileStore = defineStore('profile', () => {

    const loading = ref(false);

    const driverStatus = ref([
        {
            value: 0,
            name: 'STATUS_UNAVAILABLE',
        },
        {
            value: 1,
            name: 'STATUS_AVAILABLE',       
        },
    ]);

    async function modifyDriverStatus(input) {

        try {
            loading.value = true;
            const data = await postData(`/driver/status`, {
                ...input,
            });
            successMsg(data?.message);
            loading.value = false;
        } catch (error) {
            loading.value = false;
            console.error('Error fetching user data:', error);
        }
    }


    return {
        modifyDriverStatus,
        driverStatus,
        loading,
    };

});

if(import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProfileStore, import.meta.hot));
}