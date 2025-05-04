<script>
import {ParkingService} from "../services/parking.service.js";
import ParkingList from "../components/parking-list.component.vue";
import {Parking} from "../model/parking.entity.js";

export default {
  name: "parking-directory.component",
  components: {
    ParkingList,
  },
  data() {
    return {
      parkingService: null,
      parkingArray: [],
    }
  },
  async mounted() {
    const userId = this.$route.params.ownerId;
    this.parkingService = new ParkingService();
    await this.parkingService.getAllParkingByOwnerId(userId).then(response => {
      if (response.data && Array.isArray(response.data)) {
        this.parkingArray = response.data.map(parkingData => {
          return new Parking({
            id: parkingData.id,
            ownerId: parkingData.ownerId,
            name: parkingData.name,
            description: parkingData.description,
            address: parkingData.address,
            lat: parkingData.lat,
            lng: parkingData.lng,
            ratePerHour: parkingData.ratePerHour,
            rating: parkingData.rating,
            totalSpots: parkingData.totalSpots,
            availableSpots: parkingData.availableSpots,
            totalRows: parkingData.totalRows,
            totalColumns: parkingData.totalColumns,
            imageUrl: parkingData.imageUrl
          });
        });
      }
    }).catch(error => {
      console.error("Error retrieving parking data:", error);
    });
  }
}
</script>

<template>
  <parking-list :parkings="parkingArray"/>
</template>

<style scoped>

</style>