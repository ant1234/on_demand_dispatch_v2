<template>
    <div class="h-screen w-full">
      <div
        class="mt-5 right-4 absolute max-w-[400px] z-[1000] bg-white p-3 rounded-md shadow-lg"
      >
        <div class="flex flex-col mb-2">
          <div class="flex flex-col">
            <div>
              <span class="font-bold">Location</span> : {{ driverLocation.place_name }}
              
            </div>
          </div>
        </div>
        <button
          @click="changeLocation"
          class="flex justify-center font-semibold rounded-md bg-indigo-700 text-white px-2 py-2 w-[100%]"
        >
          <MapPinIcon class="pt-1" />
          <span class="">Change Location</span>
        </button>
      </div>
      <div class="h-screen w-full" id="map"></div>
    </div>
  </template>
  
  <script setup>
  import L from 'leaflet';
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useMapStore } from '@/stores/map/map-store';
  import { storeToRefs } from 'pinia';
  import 'leaflet-routing-machine';
  import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
  // Import Leaflet CSS
  import 'leaflet/dist/leaflet.css';
  
  // Patch icon URLs
  import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
  import markerIcon from 'leaflet/dist/images/marker-icon.png';
  import markerShadow from 'leaflet/dist/images/marker-shadow.png';
  
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });
  
  const map = ref(null);
  const mapStore = useMapStore();
const { driverLocation, customerLocationForDriver} = storeToRefs(mapStore);


const router=useRouter()

function changeLocation(){
router.push('/profile')
}

onMounted(async () => {
  await mapStore.getDriverLocation();
  await mapStore.getCustomerLocationForDriver()
 

  map.value = L.map("map").setView(
    [driverLocation.value.latitude, driverLocation.value.longitude],
    10
  );
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map.value);

  L.marker([
    driverLocation.value.latitude,
    driverLocation.value.longitude,
  ])
    .addTo(map.value)
    .bindPopup(driverLocation.value.address)
    .openPopup();

    L.circle(
      [
        parseFloat(driverLocation.value.latitude),
        parseFloat(driverLocation.value.longitude),
      ],
      {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: 500,
      }
    ).addTo(map.value);

    

   

//customer location and destination
    customerLocationForDriver.value.forEach((location)=>{



  


      L.marker([
    location.location_latitude,
    location.location_longitude,
  ])
    .addTo(map.value)
    .bindPopup(location.location_address)
    .openPopup();

    L.marker([
  location.destination_latitude,
  location.destination_longitude,
  ])
    .addTo(map.value)
    .bindPopup(location.destination_address)
    .openPopup();

    L.Routing.control({
    waypoints: [
      L.latLng(
        location.location_latitude,
        location.location_longitude
      ),
      L.latLng(
        location.destination_latitude,
        location.destination_longitude
      ),
    ],
    lineOptions: { styles: [{ color: "blue", weight: 5, opacity: 0.8 }] },
    routeWhileDragging: true,
  }).addTo(map.value);


    })

});


  </script>
  
  