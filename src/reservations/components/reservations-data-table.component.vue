<script>
import {ReservationService} from "../services/reservation.service.js";

export default {
  name: "reservations-data-table",
  props: {
    parkingId: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      reservations: [],
      reservationService: null,
      loading: true,
      error: null,
    }
  },
  methods: {
    formatCurrency(value) {
      return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    }
  },
  async mounted() {
    this.reservationService = new ReservationService();
    const response = await this.reservationService.getAllReservationsByParkingId(this.parkingId);
    this.reservations = response.data;
  }
}
</script>

<template>
  <pv-data-table :value="reservations" stripedRows removableSort tableStyle="min-width: 50rem" >
    <template #empty> No data found. </template>
    <template #loading> Loading data. Please wait. </template>
    <pv-column field="date" header="Date" sortable style="width: 20%" />
    <pv-column field="driverFullName" header="Driver Full Name" style="width: 20%" />
    <pv-column field="vehiclePlate" header="Vehicle Plate" style="width: 20%" />
    <pv-column field="startTime" header="Start Time" style="width: 20%" />
    <pv-column field="endTime" header="End Time" style="width: 20%" />
    <pv-column field="totalPrice" header="Total Price" style="width: 20%">
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.totalPrice) }}
      </template>
    </pv-column>
    <pv-column field="status" header="Status" style="width: 20%" />
  </pv-data-table>
</template>

<style scoped>

</style>