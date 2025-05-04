<script>
import ParkingCard from "./parking-card.component.vue";

export default {
  name: "parking-list",
  components: {
    ParkingCard,
  },
  props: {
    parkings: {
      type: Array,
      required: true,
    },
  },
  methods: {
    goToRegistration() {
      this.$router.push({ name: "parking-registration" });
    }
  }
}
</script>

<template>
  <div class="p-5">
    <div class="flex justify-content-between align-items-center mb-4">
      <h1 class="text-4xl font-bold m-0 text-center">Parking List</h1>
      <pv-button label="Add Parking" icon="pi pi-plus" @click="goToRegistration()"/>
    </div>
    <div class="grid">
      <div class="col-12 md:col-6 lg:col-3" v-for="(parking, index) in parkings" :key="index">
        <parking-card :parking="parking"/>
      </div>
      <p v-if="parkings.length === 0" class="text-center col-12">
        No parking available.
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>