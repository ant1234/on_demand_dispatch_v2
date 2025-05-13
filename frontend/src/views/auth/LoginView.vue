<template>
    <div class="flex justify-center flex-row mt-40">
        <div>
            <h1 class="text-3xl text-blue-500 p-4">Sign In</h1>
            <KeepAlive>
                <component :is="loginStore.currentStep" />
            </KeepAlive>
            <RouterLink to="/signup" class="font-medium text-blue-500 hover:text-blue-700 underline">
                        Create an account
            </RouterLink>
        </div>
    </div>
</template>
<script setup>
import LoginStep1 from './login/LoginStep1.vue';
import LoginStep2 from './login/LoginStep2.vue';
import { onMounted } from 'vue';
import { useLoginStore } from '@/stores/auth/login-store';

const loginStore = useLoginStore();

onMounted(() => {

    loginStore.currentStep = LoginStep1;
    loginStore.LoginStep1 = LoginStep1;
    loginStore.LoginStep2 = LoginStep2;

    console.log('LoginView mounted');

});

</script>