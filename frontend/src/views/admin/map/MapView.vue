<template>
    <div class="h-screen w-full">
      <div id="map" class="h-full w-full"></div>
    </div>
  </template>
  
  <script setup>
  import L from 'leaflet';
  import { ref, onMounted } from 'vue';
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
  
  onMounted(() => {
    map.value = L.map('map').setView([51.505, -0.09], 13);
  
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map.value);
  
    L.marker([51.5, -0.09])
      .addTo(map.value)
      .bindPopup('London')
      .openPopup();
  });
  </script>
  