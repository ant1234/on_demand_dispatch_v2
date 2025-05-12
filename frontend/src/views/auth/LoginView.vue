<template>
    <div class="flex flex-row justify-between mt-40">
        <div></div>
        <div class="w-[300px]">
            <h1>Sign In</h1>
            <div class="text-3xl text-blue-500 p-4">
                Hello, Tailwind is working! 
            </div>
            <input type="text" placeholder="Email" class="border rounded-md py-2 px-2 w-[100%]" />
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-4">
                Sign In
            </button>
            <button>
                <img :src="App.baseUrl+'/img/google.svg'" alt="logo" />
                Continue with Google
            </button>
        </div>
    </div>
</template>
<script setup>
import { App } from '@/api/api';
</script>