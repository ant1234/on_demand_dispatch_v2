import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import { getUserData } from "../../helper/utils";

export const useUploadVehicleImageStore = defineStore('upload-vehicle-image', () => {

    const modalVal = ref(false);
    const uploadImageInput = ref({ id: "", image: "" });
    const loading = ref(false);

    async function uploadVehicleImage() {
           
        return new Promise((resolve, reject) => {
            try {
                const userData = getUserData();
                const myHeaders = new Headers();
                myHeaders.append("Accept", "application/json");
                myHeaders.append("Authorization", "Bearer " + userData?.token);

                const formdata = new FormData();
                formdata.append("id", uploadImageInput.value.id);
                formdata.append("image", uploadImageInput.value.image);

                const uploadImagePayload = {
                    method: "POST",
                    headers: myHeaders,
                    body: formdata,
            };
            resolve(uploadImagePayload)
                
            } catch (error) {
                reject(error);
            }
        });
    }

    return {
        uploadImageInput,
        modalVal,
        uploadVehicleImage,
        loading
    };

});

if(import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUploadVehicleImageStore, import.meta.hot));
}