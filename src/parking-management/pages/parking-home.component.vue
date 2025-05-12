<script>
import {ParkingService} from "../services/parking.service.js";
import ParkingSpotViewer from "../components/parking-spot-viewer.component.vue";
import {Parking} from "../model/parking.entity.js";
import ParkingSummaryCard from "../components/parking-summary-card.component.vue";

export default {
  name: "parking-home",
  components: {ParkingSummaryCard, ParkingSpotViewer},
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
  <div class="flex flex-column align-items-center justify-content-between mx-auto w-full max-w-screen-xl">
    <parking-summary-card :parking="parking" v-if="parking" class="w-full max-w-screen-md" />

    <div class="flex flex-column w-full align-items-center justify-content-between">
      <div class="w-full">
        <ParkingSpotViewer
            v-if="parking"
            :parking="parking"
            @parking-spot-selected="handleSelectedSpot"
            class="w-full"
        />
        <div v-else class="text-center text-gray-500">Loading parking data...</div>
      </div>

      <div class="mt-4">
        <div class="surface-card p-4 shadow-1 border-round h-full text-center">
          <p class="text-lg text-gray-700 mb-3">Select a parking spot to view details.</p>

          <div v-if="selectedSpot">
            <h3 class="text-xl font-bold text-primary mb-2">Spot Details</h3>
            <p><strong>ID:</strong> {{ selectedSpot.id }}</p>
            <p><strong>Label:</strong> {{ selectedSpot.label }}</p>
            <p><strong>Status:</strong> {{ selectedSpot.status }}</p>
          </div>

          <div v-else class="text-gray-400 italic mt-4">
            No spot selected.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>