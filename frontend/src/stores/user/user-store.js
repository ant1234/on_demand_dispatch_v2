import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import { getData, postData } from '@/helper/http';
import { successMsg } from '@/helper/utils';


export const useUserStore = defineStore('user', () => {

    const userData = ref({});

    const loading = ref(false);

    const modalVal = ref(false);

    const roles = ref(['ADMIN', 'CUSTOMER', 'DRIVER']);

    const userId = ref(null);

    function toggleModal(id) {
        modalVal.value = !modalVal.value;
        userId.value = id;
    }

    async function modifyRole(role) {

        try {
            loading.value = true;
            const data = await postData(`/users/modify-role`, {
                role: role,
                userId: userId.value, 
            });
            successMsg(data?.message);
            userData.value = data;
            loading.value = false;
            getUsers();
        } catch (error) {
            loading.value = false;
            console.error('Error fetching user data:', error);
        }
    }

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
        roles,
        toggleModal,
        modifyRole,
        modalVal,
        getUsers,
    };

});

if(import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}