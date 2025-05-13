<template>
    <input type="text" placeholder="Password" class="border mb-2 rounded-md py-2 px-2 w-[100%]" />
    <div class="flex justify-between">
        <button @click="loginStore.previous" class="bg-blue-500 text-white py-2 px-2 rounded-md shadow-sm w-[48%]">
            Previous
        </button>
        <button class="bg-blue-500 text-white py-2 px-2 rounded-md shadow-sm w-[48%]">
            Sign In
        </button>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { useLoginStore } from '@/stores/auth/login-store';
const loginStore = useLoginStore();

onMounted(() => {
    console.log('Login Step 2 mounted');
});

      
</script>