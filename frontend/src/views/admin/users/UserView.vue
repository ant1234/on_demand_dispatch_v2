<template>
    <div class="ml-4 mr-4">
        <UserRoleModal 
            v-show="modalVal" 
            @toggleModal="userStore.toggleModal"
            :roles="roles"
            />
        <h1 class="text-2xl mb-4">User Page</h1>
        <UserTable 
            :users="userData?.data" 
            @get-users="userStore.getUsers"
            @toggleModal="userStore.toggleModal"
        />

        <div class="mb-2">
            <TailwindPagination
            :data="userData"
            @pagination-change-page="userStore.getUsers"
            class="mt-4"
            :show-disabled="true"
            :show-per-page="true"
            :show-page-size="true"
            />
        </div>

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
import UserTable from './component/UserTable.vue';
import { useUserStore } from '@/stores/user/user-store';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { TailwindPagination } from 'laravel-vue-pagination'
import UserRoleModal from './component/UserRoleModal.vue';

const userStore = useUserStore();
const { userData, modalVal } = storeToRefs(userStore);

onMounted(async () => {
    await userStore.getUsers();
});
</script>

