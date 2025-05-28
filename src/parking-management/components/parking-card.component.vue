<script>
import {Parking} from "../model/parking.entity.js";

export default {
  name: "parking-card",
  props: {
    parking: {
      type: Parking,
      required: true,
    },
  },
  methods: {
    navigateToHome(id) {
      localStorage.setItem("parkingId", id);
      this.$router.push({ name: "home", params: { parkingId: id } });
    },
  },
}
</script>

<template>
  <pv-card class="w-full h-full" style="overflow: hidden">
    <template #header>
      <img :src="parking.imageUrl" alt="Parking Image" class="w-full object-cover" />
    </template>
    <template #title>{{ parking.name  || "No data available" }}</template>
    <template #subtitle class="mt-2">
        {{ parking.address }}
      <pv-rating v-model="parking.rating" readonly class="mt-2"/>
    </template>
    <template #content>
      <p>Rate Per Hour: ${{ parking.ratePerHour }}</p>
      <p class="mt-2">{{ parking.availableSpots }} / {{ parking.totalSpots }}</p>
    </template>
    <template #footer>
      <pv-button label="View Details" icon="pi pi-eye" class="w-full" @click="navigateToHome(parking.id)"/>
    </template>
  </pv-card>
</template>

<style scoped>

</style>