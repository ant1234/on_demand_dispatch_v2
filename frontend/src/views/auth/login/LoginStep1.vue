<template>
    <InputError :errors="vStepOne$.email.$errors">
        <input
            v-model="stepOneInput.email"
            placeholder="Enter Email"
            type="text"
            class="border mb-2 rounded-md py-2 px-2 w-[100%]"
        />
    </InputError>
    <button @click="loginStore.next" class="bg-blue-500 text-white py-2 px-2 rounded-md shadow-sm w-[100%]">
        Next
    </button>
</template>
<script setup>
import { useLoginStore } from '@/stores/auth/login-store';
import { storeToRefs } from 'pinia';

const loginStore = useLoginStore();
const { stepOneInput, vStepOne$ } = storeToRefs(loginStore);
     
</script>