<template>
    <LoadingInput :loading="loading" />
    <InputError :errors="vStepTwo$.password.$errors">
        <input
            v-model="stepTwoInput.password"
            placeholder="Enter Password"
            type="text"
            class="border mb-2 rounded-md py-2 px-2 w-[100%]"
        />
    </InputError>
    <div class="flex justify-between">
        <button @click="loginStore.previous" class="bg-blue-500 text-white py-2 px-2 rounded-md shadow-sm w-[48%]">
            Previous
        </button>
        <button @click="loginStore.signIn" class="bg-blue-500 text-white py-2 px-2 rounded-md shadow-sm w-[48%]">
            Sign In
        </button>
    </div>
</template>
<script setup>

import { onMounted } from 'vue';
import { useLoginStore } from '@/stores/auth/login-store';
import { storeToRefs } from 'pinia';

const loginStore = useLoginStore();
const {loading, stepTwoInput, vStepTwo$} = storeToRefs(loginStore);

onMounted(() => {
    console.log('Login Step 2 mounted');
});

      
</script>