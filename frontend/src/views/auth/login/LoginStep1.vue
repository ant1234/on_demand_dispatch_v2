<template>
    <input type="text" placeholder="Email" class="border mb-2 rounded-md py-2 px-2 w-[100%]" />
    <button @click="loginStore.next" class="bg-blue-500 text-white py-2 px-2 rounded-md shadow-sm w-[100%]">
        Next
    </button>
</template>
<script setup>
import { onMounted } from 'vue';
import { useLoginStore } from '@/stores/auth/login-store';

const loginStore = useLoginStore();

onMounted(() => {
    console.log('Login Step 1 mounted');
});
     
</script>