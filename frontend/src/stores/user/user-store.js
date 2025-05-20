import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import { getData } from '@/helper/http';


export const useUserStore = defineStore('user', () => {

    const userData = ref({});

    const loading = ref(false);

    async function getUsers(page = 1, query = '') {

        try {
            loading.value = true;
            const data = await getData(`/users?page=${page}&query=${query}`);
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

if(import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}