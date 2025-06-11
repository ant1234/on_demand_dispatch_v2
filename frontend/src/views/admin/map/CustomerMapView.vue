<template>
  <div class="h-screen w-full">
    <div
        class="mt-5 right-4 absolute max-w-[400px] z-[10000] bg-white p-3 rounded-md shadow-lg"
      >
        <div class="flex flex-col mb-2">
          <div class="flex flex-col">
            <div>
              <div class="flex flex-col mb-2">
              <span class="font-bold">Pickup Location</span>{{ customerTripData.location_address }}
              </div>
              <div class="flex flex-col mb-2">
              <span class="font-bold">Dropoff Location</span>{{ customerTripData.destination_address }}
              </div>
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
import { useMapStore } from '@/stores/map/map-store';
import 'leaflet-routing-machine';
import 'lrm-mapbox'; 
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';


const router = useRouter();

function changeLocation() {
  router.push('/welcome');
}

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const map = ref(null);
const mapStore = useMapStore();
const { customerTripData, driverLocationForCustomer } = storeToRefs(mapStore);

onMounted(async () => {

  await mapStore.getDriverLocationForCustomer();

  // Fetch and assign mapped trip data from API
  const response = await mapStore.getCustomerTripData();

  // If needed, manually map fields from API to expected format
  // Example assumes API returns nested values like: response.data.trip
  if (response?.data?.trip) {
    const trip = response.data.trip;
    customerTripData.value = {
      location_latitude: trip.pickup_lat || trip.location_lat || undefined,
      location_longitude: trip.pickup_lng || trip.location_lng || undefined,
      destination_latitude: trip.dropoff_lat || trip.destination_lat || undefined,
      destination_longitude: trip.dropoff_lng || trip.destination_lng || undefined,
      location_address: trip.pickup_address,
      destination_address: trip.destination_address,
    };
  }


  const {
    location_latitude,
    location_longitude,
    destination_latitude,
    destination_longitude,
  } = customerTripData.value;

  if (
    location_latitude === undefined ||
    location_longitude === undefined ||
    destination_latitude === undefined ||
    destination_longitude === undefined
  ) {
    console.error("One or more coordinates are undefined:", {
      location_latitude,
      location_longitude,
      destination_latitude,
      destination_longitude,
    });
    return;
  }

  map.value = L.map('map').setView(
    [location_latitude, location_longitude],
    13
  );

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map.value);

  L.marker([location_latitude, location_longitude])
    .addTo(map.value)
    .bindPopup(`Pickup: ${customerTripData.value.location_address || 'Unknown pickup location'}`)
    .openPopup();

  L.marker([destination_latitude, destination_longitude])
    .addTo(map.value)
    .bindPopup(`Destination: ${customerTripData.value.destination_address || 'Unknown destination'}`);

  L.Routing.control({
    waypoints: [
      L.latLng(location_latitude, location_longitude),
      L.latLng(destination_latitude, destination_longitude)
    ],
    router: L.Routing.mapbox(process.env.VUE_APP_MAPBOX_ACCESS_TOKEN),
    lineOptions: { styles: [{ color: "blue", weight: 5, opacity: 0.8 }] },
    routeWhileDragging: true,
  }).addTo(map.value);


  driverLocationForCustomer.value.forEach((location) => {

    // circle code 
    L.marker([parseFloat(location?.location_latitude), parseFloat(location?.location_longitude)])
      .addTo(map.value)
      .bindPopup(location?.location_address || 'Unknown driver location');

    L.circle([parseFloat(location?.location_latitude), parseFloat(location?.location_longitude)], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(map.value);
    // end circle
  });



});
</script>
