<template>

    <span class="text-blue-500 font-semibold">
        {{ stepOneInput.email }}
    </span>

    <InputError :errors="vStepThree$.opt_code.$errors">
        <input
            v-model="stepThreeInput.opt_code"
            placeholder="Enter Code"
            type="text"
            class="border mt-2 mb-2 rounded-md py-2 px-2 w-[100%]"
        />
    </InputError>

    <div class="flex justify-between">
        <button @click="signUpStore.moveStepTwo" class="bg-blue-500 text-white py-2 px-2 rounded-md shadow-sm w-[48%]">
            Previous
        </button>
        <button 
        @click="signUpStore.signUpUser"
        class="bg-blue-500 text-white py-2 px-2 rounded-md shadow-sm w-[48%]">
            Sign Up
        </button>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { useSignUpStore } from '@/stores/auth/signup-store';
import { storeToRefs } from 'pinia';

const signUpStore = useSignUpStore();
const { vStepThree$, stepThreeInput, stepOneInput } = storeToRefs(signUpStore);

onMounted(() => {
    console.log('Login Step 2 mounted');
});

      
</script>