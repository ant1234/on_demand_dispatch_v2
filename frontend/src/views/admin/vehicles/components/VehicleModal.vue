<template>
    <BaseModal :show="props.show">
            <template #title>
                <span class="text-2xl font-semibold">Create Truck</span>
            </template>        
            <template #body>
            <InputError :errors="vehicleValidation$.name.$errors">
                <label for="Name">Name</label>
                <input
                    v-model="vehicleInput.name"
                    placeholder="Enter Name"
                    type="text"
                    class="mb-2 border rounded-md py-2 px-2 w-[100%]"
                />
            </InputError>
            <InputError :errors="vehicleValidation$.model.$errors">
                <label for="Model">Model</label>
                <input
                    v-model="vehicleInput.model"
                    placeholder="Enter Model"
                    type="text"
                    class="mb-2 border rounded-md py-2 px-2 w-[100%]"
                />
            </InputError>
            <InputError :errors="vehicleValidation$.price.$errors">
                <label for="Price">Price</label>
                <input
                    v-model="vehicleInput.price"
                    placeholder="Enter Price"
                    type="text"
                    class="mb-2 border rounded-md py-2 px-2 w-[100%]"
                />
            </InputError>
        </template>
        <template #footer>
            <button
            @click="emit('toggleModal')"
                class="mb-2 text-gray-700 border border-indigo-700 py-2 px-2 rounded-md shadow-sm"
            >
                close
            </button>
            <button
            @click="saveRole"
            :disabled="loading"
            class="mb-2 text-white border bg-indigo-700 py-2 px-2 rounded-md shadow-sm"
            >
            {{loading?"saving...":"Save"}}
            </button>
        </template>
    </BaseModal>
</template>

<script setup>
    import { useVehicleStore } from '../../../../stores/vehicle/vehicle-store';
    import { storeToRefs } from 'pinia';

   

    const vehicleStore = useVehicleStore();
    const { vehicleValidation$, vehicleInput } = storeToRefs(vehicleStore);
    const props = defineProps(['loading', 'show']);
    const emit = defineEmits(["toggleModal"]);

    console.log();
</script>