<template>
    <div class="h-screen w-full">
        <div id="map" class="h-full w-full"></div>
    </div>
</template>
  
  <script setup>
  import L from 'leaflet';
  import { ref, onMounted } from 'vue';
  import { useMapStore } from '@/stores/map/map-store';
  import 'leaflet/dist/leaflet.css';
  
  // Patch icon URLs
  import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
  import markerIcon from 'leaflet/dist/images/marker-icon.png';
  import markerShadow from 'leaflet/dist/images/marker-shadow.png';

  const mapStore = useMapStore();
  const { latitude:latitudeL, longitude:longitudeL, place:placeL } = mapStore.getLocationCoordinates();
  const { latitude, longitude, place } = mapStore.getDestinationCoordinates();
  
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });
  
  const map = ref(null);
  
  onMounted(() => {
    map.value = L.map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map.value);

    // Destination marker
    L.marker([latitude, longitude])
        .addTo(map.value)
        .bindPopup(`Destination: ${place}`)
        .openPopup();

    // Origin marker
    L.marker([latitudeL, longitudeL])
        .addTo(map.value)
        .bindPopup(`Pickup: ${placeL}`);
    });

  </script>
  