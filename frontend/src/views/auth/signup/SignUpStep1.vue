<template>

    <div :class="{ error: v$.name.$errors.length }">

        <input v-model="stepOneInput.name" 
                type="text" 
                placeholder="Email"
                class="border mb-2 rounded-md py-2 px-2 w-[100%]"> 
 
        <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
        </div>
    </div>

    <button @click="signUpStore.moveStepOne" class="bg-blue-500 text-white py-2 px-2 rounded-md shadow-sm w-[100%]">
        Next
    </button>

</template>

<script setup>
import { onMounted } from 'vue';
import { useSignUpStore } from '@/stores/auth/signup-store';
import { storeToRefs } from 'pinia';

const signUpStore = useSignUpStore();
const { v$, stepOneInput } = storeToRefs(signUpStore);

onMounted(() => {
    console.log('Login Step 1 mounted');
});
     
</script>