<script>
import {ParkingService} from "../services/parking.service.js";
import ParkingSpotViewer from "../components/parking-spot-viewer.component.vue";
import {Parking} from "../model/parking.entity.js";

export default {
  name: "parking-home",
  components: {ParkingSpotViewer},
  data() {
    return {
      parkingService: null,
      parking: null,
      selectedSpot: null,
    }
  },
  async mounted() {
    const parkingId = this.$route.params.parkingId;
    console.log(parkingId);
    this.parkingService = new ParkingService();
    await this.parkingService.getParkingById(parkingId).then(response => {
      this.parking = new Parking({...response.data});
      console.log(this.parking);
    }).catch(error => {
      console.error("Error fetching parking:", error);
    })
  },
  methods: {
    handleSelectedSpot(data) {
      if (data == null) {
        this.selectedSpot = null;
        return;
      }
      this.selectedSpot = data;
    }
  }
}
</script>

<template>
  <div class="flex flex-column justify-content-around align-items-center mx-auto">


  <div class="flex flex-column align-items-center justify-center m-0">
    <h1 class="text-2xl font-bold">Parking Management</h1>
    <p class="text-lg">Select a parking spot to view details.</p>
  </div>

  <ParkingSpotViewer v-if="parking"
                     :parking="parking"
                     @parking-spot-selected="handleSelectedSpot"
  />
  <div v-else class="loading-state">
    <p>Loading parking data...</p>
  </div>

  <div v-if="selectedSpot" class="selected-spot">
    <h2>Selected Spot Details</h2>
    <p>ID: {{ selectedSpot.id }}</p>
    <p>Label: {{ selectedSpot.label }}</p>
    <p>Status: {{ selectedSpot.status }}</p>
  </div>
  </div>
</template>

<style scoped>

</style>