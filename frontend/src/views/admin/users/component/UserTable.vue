<template>
    <div class="flex">
      <div>
        <input
          type="text"
          placeholder="Search..."
          class="mb-2 border px-2 py-2 shadow-md rounded-md"
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
        <tr v-for="(user, index) in filteredUsers" :key="user?.id">
          <td class="border px-4 py-2">{{ index + 1 }}</td>
          <td class="border px-4 py-2">{{ user?.name }}</td>
          <td class="border px-4 py-2">
            <a :href="'mailto:' + user?.email" class="text-indigo-700">
                {{ user?.email }}
            </a>
          </td>
          <td class="border px-4 py-2">{{ user?.role }}</td>
          <td class="border px-4 py-2">
            <button
              @click="emit('toggleModal', user?.id)"
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

  const emit = defineEmits(['getUsers', 'toggleModal']);
  
  const query = ref('');
  
  // Filter users by name starting with query (case insensitive)
  const filteredUsers = computed(() => {
    if (!query.value) return props.users;
    return props.users.filter(user =>
      user.name.toLowerCase().startsWith(query.value.toLowerCase())
    );
  });
  
  const deleteUser = (userId) => {
    console.log(`Delete user with ID: ${userId}`);
  };
  
  const addUser = () => {
    console.log('Add user clicked');
  };
  </script>
  