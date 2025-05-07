<script>
import ReservationsDataTable from "../components/reservations-data-table.component.vue";

export default {
  name: "reservations-data",
  components: {ReservationsDataTable},
  data() {
    return {
      parkingId: 0,
    }
  },
  async mounted() {
    const id = localStorage.getItem("parkingId");
    this.parkingId = Number(id);
  }
}
</script>

<template>
  <h1 class="text-3xl font-bold underline">
    Reservations Data
  </h1>
  <reservations-data-table :parkingId="parkingId" v-if="parkingId"/>
</template>

<style scoped>

</style>