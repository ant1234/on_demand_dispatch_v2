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
                    <li>
                        <RouterLink to="welcome" class="flex text-black-600 hover:bg-slate-200 cursor-pointer gap-2 px-2 py-2 rounded-md">
                            <HomeIcon class="mt-1" />
                            <span v-show="toggleSideBar">Home</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="payments" class="flex text-black-600 hover:bg-slate-200 cursor-pointer gap-2 px-2 py-2 rounded-md">
                            <PaymentIcon class="mt-1" />   
                            <span v-show="toggleSideBar">Payments</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="vehicles" class="flex text-black-600 hover:bg-slate-200 cursor-pointer gap-2 px-2 py-2 rounded-md">
                            <TruckIcon class="mt-1" />
                            <span v-show="toggleSideBar" class="ml-2">Vehicles</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink v-show="userData?.user?.role === ADMIN_ROLE" to="users" class="flex text-black-600 hover:bg-slate-200 cursor-pointer gap-2 px-2 py-2 rounded-md">
                            <UsersIcon class="mt-1" />
                            <span v-show="toggleSideBar" class="ml-2">Users</span>
                        </RouterLink>
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
        <div class="flex justify-end">
            <div></div>
            <div class="py-3 px-3">
                <button @click="displayNotificationPage" class="relative inline-flex items-center justify-center p-2 bg-slate-200  rounded-full">
                    <NotificationIcon class="w-6 h-6" />
                    <span class="absolute top-0 left-8 px-2 text-white font-semibold block  rounded-full bg-red-500">{{notificationVal}}</span>  
                </button>
            </div>
            <div class="py-3 px-3">
                <img
                @click="toggleTopNavBarMenu"
                    src="@/assets/avatar.webp"
                    alt="user avatar"
                    class="rounded-full border-2 hover:border-white w-10 h-10 cursor-pointer"
                />
                <ul v-show="topNavBarMenu" class="z-[100000] bg-white absolute right-4 py-2 px-2 rounded-md shadow-lg w-[250px] divide-y divide-gray-200">
                    <li class="px-2 py-2">
                        {{ userData?.user.name }}
                        <br>
                        <a href="" class="text-indigo-600">{{ userData?.user.email }}</a>
                        <br>
                        <span class="text-indigo-600">Role : {{ userData?.user.role}}</span>
                        <br>
                        <RouterLink class="text-indigo-600 underline" to="profile">
                            Profile
                        </RouterLink>
                    </li>


                    <li @click="loginStore.logout" class="px-2 py-2 hover:bg-gray-100 cursor-pointer rounded-md text-red-600 font-semibold">
                        Logout
                    </li>
                </ul>
            </div>
        </div>
        <!-- <div class="flex p-10">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga laudantium id nam rerum incidunt dolorem voluptatibus, possimus enim dolorum debitis excepturi commodi quae consectetur corporis cumque dignissimos, quis error quos?</p>
        </div> -->
        <slot name="main"></slot>
    </div>
    <!-- main section  -->

</template>
<script setup>
import ChevronIconLeft from '@/components/icons/ChevronIconLeft.vue';
import ChevronIconRight from '@/components/icons/ChevronIconRight.vue';
import { ref } from 'vue';
import { DRIVER_ROLE, CUSTOMER_ROLE } from '@/constants/roles';
import { useRouter } from 'vue-router';
import { getUserData } from '@/helper/utils';
import { useLoginStore } from '@/stores/auth/login-store';
import { RouterLink } from 'vue-router';
import { ADMIN_ROLE } from "@/constants/roles";
import { storeToRefs } from "pinia";
import { useMapStore } from '@/stores/map/map-store';

const loginStore = useLoginStore();

const toggleSideBar = ref(false);
const topNavBarMenu = ref(false);
const mapStore = useMapStore();
const { notificationVal } = storeToRefs(mapStore);

const userData = getUserData();

const toggle = () => {
    toggleSideBar.value = !toggleSideBar.value;
};

const toggleTopNavBarMenu = () => {
    topNavBarMenu.value = !topNavBarMenu.value;
};

const router = useRouter()

function displayNotificationPage(){

  const role = userData?.user?.role

    if(role === DRIVER_ROLE){
        notificationVal.value = 0
        router.push('/customer_notifications')
    }

    if(role === CUSTOMER_ROLE){
        notificationVal.value = 0
        router.push('/driver_notifications')
    }

    }
</Script>