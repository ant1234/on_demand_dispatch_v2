<template>
    <div class="flex flex-row">
        <SideBar>
            <template #main>
                <RouterView />
            </template>
        </SideBar>
    </div>
</template>

<script setup>
import SideBar from './components/SideBar.vue';
</script>
