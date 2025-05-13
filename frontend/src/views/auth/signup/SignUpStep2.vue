<template>
    <input type="text" placeholder="Password" class="border mb-2 rounded-md py-2 px-2 w-[100%]" />
    <div class="flex justify-between">
        <button @click="signUpStore.moveStepOne" class="bg-blue-500 text-white py-2 px-2 rounded-md shadow-sm w-[48%]">
            Previous
        </button>
        <button @click="signUpStore.moveStepThree" class="bg-blue-500 text-white py-2 px-2 rounded-md shadow-sm w-[48%]">
            Next
        </button>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { useSignUpStore } from '@/stores/auth/signup-store';

const signUpStore = useSignUpStore();

onMounted(() => {
    console.log('Login Step 2 mounted');
});

      
</script>