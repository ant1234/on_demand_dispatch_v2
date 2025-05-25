<template>
    <div class="flex justify-end p-2">
      <button
        @click="emit('toggleModal')"
        class="bg-blue-500 text-white px-2 py-1 rounded"
      >
        Create
      </button>
    </div>
    <table class="w-full mt-4">
      <thead>
        <tr>
          <th class="border px-4 py-2">#</th>
          <th class="border px-4 py-2">Image</th>
          <th class="border px-4 py-2">Name</th>
          <th class="border px-4 py-2">Model</th>
          <th class="border px-4 py-2">Price / Km</th>
          <th class="border px-4 py-2">Upload-image</th>
          <th class="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(vehicle, index) in vehicles" :key="vehicle?.id">
          <td class="border px-4 py-2">{{ index + 1 }}</td>
          <td class="border px-4 py-2"><img :src="vehicle?.image" alt="vehicle image" class="w-10"/></td>
          <td class="border px-4 py-2">{{ vehicle?.name }}</td>
          <td class="border px-4 py-2">{{ vehicle?.model }}</td>
          <td class="border px-4 py-2">{{ vehicle?.price }}</td>
          <td class="border px-4 py-2">{{ vehicle?.image }}</td>
          <td class="border px-4 py-2">
            <button
              @click="emit('uploadImage', vehicle?.id)"
              class="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
            >
              Upload 
            </button>
            <button
              @click="emit('editVehicle', vehicle?.id)"
              class="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
            >
              Edit 
            </button>
            <button
              @click="emit('removeVehicle', vehicle?.id)"
              class="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Remove 
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  
    <div class="mt-4">
      <button @click="addVehicle" class="bg-green-500 text-white px-4 py-2 rounded">
        Add Vehicle
      </button>
    </div>
  </template>
  
  <script setup>

  defineProps(["vehicles"]);

  const emit = defineEmits(['editVehicle', 'uploadImage', 'removeVehicle', 'toggleModal']);

  const addVehicle = () => {
    console.log('add vehicle');
  }


  </script>
  