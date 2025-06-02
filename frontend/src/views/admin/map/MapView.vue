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
  
  // Coordinates
  const {
    latitude: latitudeL,
    longitude: longitudeL
  } = mapStore.getLocationCoordinates();
  
  const {
    latitude,
    longitude
  } = mapStore.getDestinationCoordinates();
  
  // Place names from computed values
  const placeL = mapStore.placeLocation;
  const place = mapStore.placeDestination;
  
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });
  
  const map = ref(null);
  
  onMounted(() => {
    console.log('Map coordinates:', {
      latitude, longitude, latitudeL, longitudeL,
      place: place.value, placeL: placeL.value,
    });
  
    if (
      latitude === undefined || longitude === undefined ||
      latitudeL === undefined || longitudeL === undefined
    ) {
      console.error("One or more coordinates are undefined!");
      return;
    }
  
    map.value = L.map('map').setView([latitude, longitude], 13);
  
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map.value);
  
    L.marker([latitude, longitude])
      .addTo(map.value)
      .bindPopup(`Destination: ${place.value}`)
      .openPopup();
  
    L.marker([latitudeL, longitudeL])
      .addTo(map.value)
      .bindPopup(`Pickup: ${placeL.value}`);
  });
  </script>
  