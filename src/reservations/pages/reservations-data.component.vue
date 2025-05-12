<script>
import ReservationsDataTable from "../components/reservations-data-table.component.vue";
import {useAuthenticationStore} from "../../iam/services/authentication.store.js";

export default {
  name: "reservations-data",
  components: {ReservationsDataTable},
  data() {
    return {
      authenticationStore: useAuthenticationStore()
    }
  },
}
</script>

<template>
  <h1 class="text-2xl font-bold text-primary md:text-4xl">
    {{ $t('reservationData') }}
  </h1>
  <reservations-data-table :parkingId="authenticationStore.currentParkingId" v-if="authenticationStore.currentParkingId"/>
</template>

<style scoped>

</style>