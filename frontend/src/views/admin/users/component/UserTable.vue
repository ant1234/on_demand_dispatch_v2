<template>
    <div class="flex">
      <div>
        <input
          type="text"
          placeholder="Search..."
          class="border px-2 py-1 rounded"
          v-model="query"
        />
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
        <tr v-for="user in filteredUsers" :key="user?.id">
          <td class="border px-4 py-2">{{ user?.id }}</td>
          <td class="border px-4 py-2">{{ user?.name }}</td>
          <td class="border px-4 py-2">{{ user?.email }}</td>
          <td class="border px-4 py-2">{{ user?.role }}</td>
          <td class="border px-4 py-2">
            <button
              @click="editUser(user?.id)"
              class="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>
            <button
              @click="deleteUser(user?.id)"
              class="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </td>
        </tr>
        <tr v-if="filteredUsers.length === 0">
          <td colspan="5" class="text-center py-4">No users found.</td>
        </tr>
      </tbody>
    </table>
  
    <div class="mt-4">
      <button @click="addUser" class="bg-green-500 text-white px-4 py-2 rounded">
        Add User
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const props = defineProps({
    users: {
      type: Array,
      default: () => [],
    },
  });
  
  const query = ref('');
  
  // Filter users by name starting with query (case insensitive)
  const filteredUsers = computed(() => {
    if (!query.value) return props.users;
    return props.users.filter(user =>
      user.name.toLowerCase().startsWith(query.value.toLowerCase())
    );
  });
  
  const editUser = (userId) => {
    console.log(`Edit user with ID: ${userId}`);
  };
  
  const deleteUser = (userId) => {
    console.log(`Delete user with ID: ${userId}`);
  };
  
  const addUser = () => {
    console.log('Add user clicked');
  };
  </script>
  