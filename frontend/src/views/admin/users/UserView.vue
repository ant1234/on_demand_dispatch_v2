<template>
    <div class="ml-4 mr-4">
        <h1 class="text-2xl mb-4">User Page</h1>
        <UserTable :users="userData?.data" />
    </div>
</template>
<script setup>
import UserTable from './component/UserTable.vue';
import { useUserStore } from '@/stores/user/user-store';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { userData } = storeToRefs(userStore);

onMounted(async () => {
    await userStore.getUsers();
});
</script>

