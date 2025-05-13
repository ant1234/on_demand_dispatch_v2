<template>
    <div class="flex justify-center flex-row mt-40">
        <div>
            <h1 class="text-3xl text-blue-500 p-4">Sign Up</h1>
            <KeepAlive>
                <component :is="signUpStore.currentStep" />
            </KeepAlive>
            <div class="flex">
                <RouterLink to="/login" class="font-medium text-blue-500 hover:text-blue-700 underline">
                        Login
                </RouterLink>
            </div>
        </div>
    </div>
</template>
<script setup>
import SignUpStep1 from './signup/SignUpStep1.vue';
import SignUpStep2 from './signup/SignUpStep2.vue';
import SignUpStep3 from './signup/SignUpStep3.vue';
import { useSignUpStore } from '@/stores/auth/signup-store';
import { onMounted } from 'vue';

const signUpStore = useSignUpStore();

onMounted(() => {

    signUpStore.currentStep = SignUpStep1;
    signUpStore.SignUpStep1 = SignUpStep1;
    signUpStore.SignUpStep2 = SignUpStep2;
    signUpStore.SignUpStep3 = SignUpStep3;

    console.log(signUpStore.currentStep);

});

</script>