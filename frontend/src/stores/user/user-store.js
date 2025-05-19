import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import { postData } from '@/helper/http';


export const useUserStore = defineStore('user', () => {

    const userData = ref({});

    const loading = ref(false);

    async function getUsers(page = 1) {

        try {
            loading.value = true;
            const data = await postData('/users?page=' + page);
            userData.value = data;
            loading.value = false;
        } catch (error) {
            loading.value = false;
            console.error('Error fetching user data:', error);
        }
    }

    return {
        userData,
        loading,
        getUsers,
    };

});