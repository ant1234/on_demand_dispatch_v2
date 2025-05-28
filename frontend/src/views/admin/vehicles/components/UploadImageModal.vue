<template>
    <BaseModal :show="props.show">
        <template #title>
            <span class="text-2xl font-semibold">Upload Image</span>
        </template>        
        <template #body>
            <img style="height: 150px;" alt="Image" id="outputImage"/>
            <label for="">Select image</label>
            <input type="file" id="imageInput" @change="selectImage" />
        </template>
        <template #footer>
            <button
                @click="modalVal=false"
                class="mb-2 text-gray-700 border border-indigo-700 py-2 px-2 rounded-md shadow-sm"
            >
                close
            </button>
            <button
                :disabled="loading"
                @click="uploadImage"
                class="mb-2 text-white border bg-indigo-700 py-2 px-2 rounded-md shadow-sm"
            >
                {{ loading ? "Uploading..." : "Upload" }}
            </button>
        </template>
    </BaseModal>
</template>

<script setup>

    import { storeToRefs } from 'pinia';
    import { App } from "@/api/api.js";
    import { showError } from '@/helper/utils';
    import { useUploadVehicleImageStore } from '@/stores/vehicle/upload-vehicle-image-store';

    const uploadVehicleImageStore = useUploadVehicleImageStore();
    const { uploadImageInput, loading, modalVal } = storeToRefs(uploadVehicleImageStore);

    function selectImage(event) {
        const selectImage = event.target.files[0];
        const output = document.querySelector('#outputImage');
        output.src = URL.createObjectURL(selectImage);
        output.onload = function() {
            URL.revokeObjectURL(selectImage);
        }
        uploadImageInput.value.image = selectImage;
    } 

    async function uploadImage() {
    const payload = await uploadVehicleImageStore.uploadVehicleImage();
    loading.value = true;
    fetch(App.apiBaseUrl + "/vehicles/image", payload)
        .then((response) => response.json())
        .then(async() => {
            document.querySelector("#outputImage").src = "";  
            document.querySelector("#imageInput").value = "";           
            loading.value = false;
            modalVal.value = false;
            await emit('getVehicles')

        })
        .catch((error) => {
            showError(error?.message);
            loading.value = false;
        });
    }

    const props = defineProps(['show', 'loading']);
    const emit = defineEmits(['getVehicles'])
</script>