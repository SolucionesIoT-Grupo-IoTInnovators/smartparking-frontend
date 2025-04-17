<script>
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import {Parking} from "../model/parking.entity.js";

export default {
  name: "parking-address-picker",
  props: {
    parking: {
      type: Parking,
      required: true // { lat, lng, address }
    }
  },
  emits: ['location-changed'],
  data() {
    return {
      submitted: false,
      address: this.parking?.address || '',
      map: null,
      marker: null,
      debounceTimeout: null
    }
  },
  watch: {
    parking: {
      handler(newValue) {
        if (newValue.address !== this.address) {
          this.address = newValue.address || '';
        }
      },
      deep: true
    }
  },
  mounted() {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    const initialLng = this.parking.lng || -77.0428
    const initialLat = this.parking.lat || -12.0464

    this.map = new mapboxgl.Map({
      container: this.$refs.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [initialLng, initialLat],
      zoom: 14,
    })

    this.marker = new mapboxgl.Marker({ draggable: true })
      .setLngLat([initialLng, initialLat])
      .addTo(this.map)

    this.marker.on('dragend', () => {
      const lngLat = this.marker.getLngLat()
      this.updateLocation(lngLat.lat, lngLat.lng)
      this.fetchAddressFromCoords(lngLat.lat, lngLat.lng)
    })

    this.map.on('click', (e) => {
      const { lng, lat } = e.lngLat
      this.marker.setLngLat([lng, lat])
      this.updateLocation(lat, lng)
      this.fetchAddressFromCoords(lat, lng)
    })
  },
  methods: {
    updateLocation(lat, lng, newAddress = this.address) {
      this.submitted = true
      this.parking.lat = lat
      this.parking.lng = lng
      this.parking.address = newAddress
      this.$emit('location-changed', this.parking)
    },
    async fetchAddressFromCoords(lat, lng) {
      const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`)
      const data = await res.json()
      if (data.features?.length > 0) {
        this.address = data.features[0].place_name
        this.updateLocation(lat, lng, this.address)
      }
    },
    onAddressInput() {
      clearTimeout(this.debounceTimeout)
      this.debounceTimeout = setTimeout(this.searchAddress, 800)
    },
    async searchAddress() {
      if (!this.address) return
      const query = encodeURIComponent(this.address)
      const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxgl.accessToken}`)
      const data = await res.json()
      if (data.features?.length > 0) {
        const [lng, lat] = data.features[0].center
        this.marker.setLngLat([lng, lat])
        this.map.flyTo({ center: [lng, lat], zoom: 15 })
        this.updateLocation(lat, lng, this.address)
      }
    }
  }
}
</script>

<template>
  <h3 class="text-4xl font-bold mb-5 text-center">Define Location</h3>
  <div class="mapbox-picker">
    <div class="mb-3">
      <pv-float-label>
        <pv-input-text
          id="address"
          v-model="address"
          @input="onAddressInput"
          class="w-full"
        />
      <label for="address" class="block mb-1 font-semibold">Address</label>
      </pv-float-label>
      <small v-if="submitted && !parking.address" class="p-error">Address is required</small>
    </div>

    <div ref="mapContainer" class="map"></div>
  </div>
</template>

<style scoped>
.map {
  width: 100%;
  height: 400px;
  border-radius: 8px;
  margin-top: 1rem;
}
</style>