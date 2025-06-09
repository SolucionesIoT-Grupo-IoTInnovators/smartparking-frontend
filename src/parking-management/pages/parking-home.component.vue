<script>
import {ParkingService} from "../services/parking.service.js";
import ParkingSpotViewer from "../components/parking-spot-viewer.component.vue";
import {Parking} from "../model/parking.entity.js";
import ParkingSummaryCard from "../components/parking-summary-card.component.vue";
import ReservationFormDialog from "../../reservations/components/reservation-form-dialog.component.vue";

export default {
  name: "parking-home",
  components: {ReservationFormDialog, ParkingSummaryCard, ParkingSpotViewer},
  data() {
    return {
      parkingService: null,
      parking: null,
      selectedSpot: null,
      isVisible: false,
      charData: null,
      chartOptions: null,
    }
  },
  async mounted() {
    await this.getParkingData();
  },
  methods: {
    async getParkingData() {
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
    handleSelectedSpot(data) {
      if (data == null) {
        this.selectedSpot = null;
        return;
      }
      this.selectedSpot = data;
    },
    handleClose() {
      this.isVisible = false;
    },
    handleRefresh() {
      this.getParkingData();
      window.location.reload();
    }
  },
}
</script>

<template>
  <div class="flex flex-column align-items-center justify-content-between mx-auto w-full max-w-screen-xl">
    <parking-summary-card :parking="parking" v-if="parking" class="w-full max-w-screen-md"/>

    <div class="flex flex-column w-full align-items-center justify-content-between">
      <div class="w-full">
        <ParkingSpotViewer
            v-if="parking"
            :parking="parking"
            @parking-spot-selected="handleSelectedSpot"
            class="w-full surface-card p-4 shadow-1 border-round h-full text-center"
        />
        <div v-else class="text-center text-gray-500">{{ $t("parking-home.loading") }}</div>


        <div class="mt-4">
          <div class="surface-card p-4 shadow-1 border-round h-full text-center">
            <p class="text-lg text-gray-700 mb-3">{{ $t('parking-home.selectedSpot') }}</p>

            <div v-if="selectedSpot">
              <h3 class="text-xl font-bold text-primary mb-2">{{ $t('parking-home.spotDetails') }}</h3>
              <p><strong>ID:</strong> {{ selectedSpot.id }}</p>
              <p><strong>{{ $t('parking-home.label') }}:</strong> {{ selectedSpot.label }}</p>
              <p><strong>{{ $t('parking-home.status') }}:</strong> {{ selectedSpot.status }}</p>
              <pv-button
                  :label="$t('parking-home.button')"
                  icon="pi pi-check"
                  class="p-button-primary mt-3"
                  @click="isVisible = true"
              />
            </div>

            <div v-else class="text-gray-400 italic mt-4">
              {{ $t('parking-home.noSpotSelected') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <reservation-form-dialog :isVisible="isVisible" :spot="selectedSpot" v-if="selectedSpot" @closeD="handleClose()"
                           @refresh="handleRefresh"/>
</template>

<style scoped>

</style>