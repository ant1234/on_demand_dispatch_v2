<template>

    <InputError :errors="vStepOne$.name.$errors">
        <input
            v-model="stepOneInput.name"
            placeholder="Enter Name"
            type="text"
            class="mb-2 border rounded-md py-2 px-2 w-[100%]"
        />
    </InputError>

    <InputError :errors="vStepOne$.email.$errors">
        <input v-model="stepOneInput.email" 
            type="text" 
            placeholder="Enter Email"
            class="border mb-2 rounded-md py-2 px-2 w-[100%]"/> 
    </InputError>

    <button @click="signUpStore.moveStepTwo" class="bg-blue-500 text-white py-2 px-2 rounded-md shadow-sm w-[100%]">
        Next
    </button>

</template>

<script setup>
import { onMounted } from 'vue';
import { useSignUpStore } from '@/stores/auth/signup-store';
import { storeToRefs } from 'pinia';

const signUpStore = useSignUpStore();
const { vStepOne$, stepOneInput } = storeToRefs(signUpStore);

onMounted(() => {
    console.log('Login Step 1 mounted');
});
     
</script>