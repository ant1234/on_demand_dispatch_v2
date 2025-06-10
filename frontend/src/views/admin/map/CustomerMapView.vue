<template>
  <div class="h-screen w-full">
    <div id="map" class="h-full w-full"></div>
  </div>
</template>

<script setup>
import L from 'leaflet';
import { ref, onMounted } from 'vue';
import { useMapStore } from '@/stores/map/map-store';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { storeToRefs } from 'pinia';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const map = ref(null);
const mapStore = useMapStore();
const { customerTripData } = storeToRefs(mapStore);

onMounted(async () => {
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
    lineOptions: { styles: [{ color: "blue", weight: 5, opacity: 0.8 }] },
    routeWhileDragging: true,
  }).addTo(map.value);
});
</script>
