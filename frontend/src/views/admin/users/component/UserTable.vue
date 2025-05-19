<template>
        <div class="flex">
            <div>
                <input type="text" placeholder="Search..." class="border px-2 py-1 rounded" v-model="searchQuery" />
            </div>
        </div>

        <table class="w-full mt-4">
            <thead>
                <tr>
                    <th class="border px-4 py-2">ID</th>
                    <th class="border px-4 py-2">Name</th>
                    <th class="border px-4 py-2">Email</th>
                    <th class="border px-4 py-2">Role</th>
                    <th class="border px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user?.id">
                    <td class="border px-4 py-2">#</td>
                    <td class="border px-4 py-2">{{ user?.name }}</td>
                    <td class="border px-4 py-2">{{ user?.email }}</td>
                    <td class="border px-4 py-2">{{ user?.role }}</td>
                    <td class="border px-4 py-2">
                        <button @click="editUser(user?.id)" class="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                        <button @click="deleteUser(user?.id)" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="mt-4">
            <button @click="addUser" class="bg-green-500 text-white px-4 py-2 rounded">Add User</button>
        </div>
</template>
<script setup>

const defineProps = defineProps(['users']);
const useUserStore = useUserStore();

const users = useUserStore.getUsers()
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.error(error);
    });



</script>