<template>
    <div class="h-screen">
        <div class="h-full">
            <nav :class="`h-full bg-slate-50 ${!toggleSideBar ? 'w-[210px]' : ''} `">
                <div class="flex justify-between h-40 p-3">
                    <img v-show="toggleSideBar" src="@/assets/brand_logo_2.png" alt="Logo" class="w-[75%] h-[75%] mx-auto mt-4" />
                    <button 
                        @click="toggle"
                        v-if="toggleSideBar" 
                        class="hover:bg-slate-200 px-2 rounded-md">
                        <ChevronIconLeft />
                    </button>
                    <button 
                        v-else
                        @click="toggle"
                        class="hover:bg-slate-200 px-2 py-2 rounded-md">
                        <ChevronIconRight />
                    </button>
                </div>
                <ul class="flex flex-col p-2 gap-2">
                    <li class="flex text-black-600 hover:bg-slate-200 cursor-pointer gap-2 px-2 py-2 rounded-md">
                        <HomeIcon class="mt-1" />
                        <span v-show="toggleSideBar"> Home</span>
                    </li>
                    <li class="flex text-black-600 hover:bg-slate-200 cursor-pointer gap-2 px-2 py-2 rounded-md">
                        <PaymentIcon class="mt-1" />   
                        <span v-show="toggleSideBar"> Payments</span>
                    </li>
                    <li class="flex text-black-600 hover:bg-slate-200 cursor-pointer gap-2 px-2 py-2 rounded-md">
                        <UsersIcon class="mt-1" />
                        <span v-show="toggleSideBar"> Users</span>
                    </li>
                    <li @click="loginStore.logout" class="flex text-red-600 hover:bg-slate-200 cursor-pointer gap-2 px-2 py-2 rounded-md">
                        <LogoutIcon class="mt-1" />
                        <span v-show="toggleSideBar"> Logout</span>
                    </li>
                </ul>
            </nav>
        </div>
    </div>

    <!-- main section  -->
    <div class="bg-slate w-full">
        <div class="flex justify-between">
            <div></div>
            <div class="py-3 px-3">
                <img
                @click="toggleTopNavBarMenu"
                    src="@/assets/avatar.webp"
                    alt="user avatar"
                    class="rounded-full border-2 hover:border-white w-10 h-10 cursor-pointer"
                />
                <ul v-show="topNavBarMenu" class="bg-white absolute right-4 py-2 px-2 rounded-md shadow-lg w-[250px] divide-y divide-gray-200">
                    <li class="px-2 py-2">
                        {{ userData?.user.name }}
                        <br>
                        <a href="" class="text-indigo-600">{{ userData?.user.email }}</a>
                    </li>
                    <li @click="loginStore.logout" class="px-2 py-2 hover:bg-gray-100 cursor-pointer rounded-md text-red-600 font-semibold">
                        Logout
                    </li>
                </ul>
            </div>
        </div>
        <div class="flex p-10">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga laudantium id nam rerum incidunt dolorem voluptatibus, possimus enim dolorum debitis excepturi commodi quae consectetur corporis cumque dignissimos, quis error quos?</p>
        </div>
    </div>
    <!-- main section  -->

</template>
<script setup>
import ChevronIconLeft from '@/components/icons/ChevronIconLeft.vue';
import ChevronIconRight from '@/components/icons/ChevronIconRight.vue';
import { ref } from 'vue';
import { getUserData } from '@/helper/utils';
import { useLoginStore } from '@/stores/auth/login-store';

const loginStore = useLoginStore();

const toggleSideBar = ref(false);
const topNavBarMenu = ref(false);
const userData = getUserData();

const toggle = () => {
    toggleSideBar.value = !toggleSideBar.value;
};

const toggleTopNavBarMenu = () => {
    topNavBarMenu.value = !topNavBarMenu.value;
};
</Script>