<template>
    <div class="ml-4 mr-4">
        <h1 class="text-2xl mb-4">User Page</h1>
        <UserTable />
    </div>
</template>
<script setup>

// import { useUserStore } from '@/stores/user';
import UserTable from './component/UserTable.vue';

// const users = useUserStore().getUsers()
//     .then((response) => {
//         console.log(response);
//     })
//     .catch((error) => {
//         console.error(error);
//     });


</script>