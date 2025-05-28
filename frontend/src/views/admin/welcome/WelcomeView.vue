<template>
    <div class="bg-white flex flex-col p-2">

        <div class="flex">
            <div class="flex flex-col mr-20">
            <!-- Call to action -->
            <img src="@/assets/taxi/cab-booking.png" alt="Booking" />        
            </div>
            <div class="ml-20">
                <h1 class="text-2xl mb-10 mt-10 font-semibold">
                        Trust the leading and the most reliable <br />
                        US taxi operator.
                </h1>
                <div class="flex flex-col mb-2">
                    <select name="" id="" class="mb-2 border rounded-md py-2 px-2 w-[100%]">
                        <option value="">Select Taxi</option>
                        <option value="">New York</option>
                        <option value="">Los Angeles</option>
                        <option value="">Chicago</option>
                    </select>
                </div>
                <div class="flex gap-2 mb-2">
                    <input type="text" placeholder="Enter Drop Location" class="mb-2 border rounded-md py-2 px-2 w-[100%]" />
                    <input type="text" placeholder="Enter Pickup Location" class="mb-2 border rounded-md py-2 px-2 w-[100%]" />
                </div>
                <button
                    @click="bookTaxi"
                    class="flex justify-center font-semibold rounded-md bg-indigo-700 text-white px-2 py-2 w-[100%]"
                >
                    <span class="">Book taxi now</span>
                    <ArrowRightIcon class="pt-1" />
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-2 gap-2">
            <div class="flex flex-col shadow-md" v-for="car in [1,2,3,4,5]" :key="car">
                <div align="center">
                    <img src="@/assets/taxi/cab_booking1.png" alt="Booking" />
                    <div>
                        <span>Tesla Model Y</span>
                    </div>
                    <div>
                        <span>$12 / Km</span>
                    </div>
                </div>
                <div class="flex justify-center p-2 mb-2">
                    <button class="rounded-md gap-2 flex border border-indigo-700 text-gray-800 px-2 py-2 hover:bg-indigo-700 hover:text-white font-semibold text-sm">
                        <span class="text-xl text-gray-700">Book Now</span>
                        <ArrowRightIcon />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
// import { App } from "@/api/api.js";

</script>