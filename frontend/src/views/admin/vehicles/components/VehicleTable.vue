<template>
    <div class="flex justify-end p-2">
      <button
        @click="emit('toggleModal')"
        class="text-white px-2 py-1 rounded-md border bg-indigo-700 font-semibold hover:bg-indigo-500 hover:text-white"
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
          <td class="border px-4 py-2">
            <a
                        class="text-indigo-600 px-2 py-1 rounded-md border border-indigo-700 font-semibold hover:bg-indigo-500 hover:text-white"
                        @click="emit('uploadImage', vehicle?.id)"
                        href="#"
                        >Upload-Image</a
                    >
          </td>
          <td class="border px-4 py-2">
            <button
                class="text-indigo-600 px-2 py-1 mr-1 rounded-md border border-indigo-700 font-semibold hover:bg-indigo-500 hover:text-white"
                @click="emit('editVehicle', vehicle)"
                href="#"
                >Edit</button
            >
            <button
                class="text-gray-700 px-2 py-1 mr-1 rounded-md border border-red-700 font-semibold hover:bg-red-500 hover:text-white"
                href="#"
                @click="emit('removeVehicle', vehicle?.id)"
                >Delete</button
            >
          </td>
        </tr>
      </tbody>
    </table>
  
  </template>
  
  <script setup>

  defineProps(["vehicles"]);
  const emit = defineEmits(['editVehicle', 'uploadImage', 'removeVehicle', 'toggleModal']);

  </script>
  