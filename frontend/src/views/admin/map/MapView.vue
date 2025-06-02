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
  
  onMounted(() => {
    const { latitude: pickupLat, longitude: pickupLng, place: pickupPlace } = mapStore.getLocationCoordinates();
    const { latitude: dropLat, longitude: dropLng, place: dropPlace } = mapStore.getDestinationCoordinates();
  
    if (
      pickupLat === undefined || pickupLng === undefined ||
      dropLat === undefined || dropLng === undefined
    ) {
      console.error("One or more coordinates are undefined!");
      return;
    }
  
    map.value = L.map('map').setView([pickupLat, pickupLng], 13);
  
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map.value);
  
    L.marker([pickupLat, pickupLng])
      .addTo(map.value)
      .bindPopup(`Pickup: ${pickupPlace || 'Unknown pickup location'}`)
      .openPopup();
  
    L.marker([dropLat, dropLng])
      .addTo(map.value)
      .bindPopup(`Destination: ${dropPlace || 'Unknown destination'}`);

    L.Routing.control({
        waypoints: [
            L.latLng(pickupLat, pickupLng),
            L.latLng(dropLat, dropLng)
        ],
        lineOptions: { styles: [{ color: "blue", weight: 5, opacity: 0.8 }] },
        routeWhileDragging: true,
    }).addTo(map.value);

  });
  </script>
  
  