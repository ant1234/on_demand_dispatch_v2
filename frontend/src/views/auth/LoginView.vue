<template>
    <div class="flex justify-center flex-row mt-40">
        <div>
            <h1 class="text-3xl text-blue-500 p-4">Sign In</h1>
            <KeepAlive>
                <component :is="loginStore.currentStep" />
            </KeepAlive>
        </div>
    </div>
</template>
<script setup>
import RegistrationStep1 from './login/RegistrationStep1.vue';
import { onMounted } from 'vue';
import RegistrationStep2 from './login/RegistrationStep2.vue';
import { useLoginStore } from '@/stores/login-store';

const loginStore = useLoginStore();

onMounted(() => {

    loginStore.currentStep = RegistrationStep1;
    loginStore.RegistrationStep1 = RegistrationStep1;
    loginStore.RegistrationStep2 = RegistrationStep2;

    console.log('LoginView mounted');

});

</script>