<template>
    <div :class="{ error: props.errors.length }">

        <slot></slot>

        <div class="input-errors" v-for="error of props.errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
        </div>

    </div>
</template>

<script setup>
import { defineProps } from 'vue';
    const props = defineProps(['errors']);
</script>

<style scoped>
    .error-msg {
        color: red;
    }
</style>