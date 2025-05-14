<script>
import ParkingCreateAndEdit from "../components/parking-create-and-edit.component.vue";
import {ParkingService} from "../services/parking.service.js";
import {Parking} from "../model/parking.entity.js";

export default {
  name: "parking-profile",
  components: {ParkingCreateAndEdit},
  data() {
    return {
      parking: null,
      parkingId: null,
      parkingService: null,
    }
  },
  methods: {
    async getParkingData(parkingId) {
      try {
        const response = await this.parkingService.getParkingById(parkingId);
        this.parking = new Parking(response.data);
      } catch (error) {
        console.error("Error fetching parking data:", error);
      }
    }
  },
  mounted() {
    this.parkingId = Number(localStorage.getItem("parkingId"));
    this.parkingService = new ParkingService();
    this.getParkingData(this.parkingId);
  }
}
</script>

<template>
  <parking-create-and-edit :parking="parking" v-if="parking" />
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<style scoped>

</style>