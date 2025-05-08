<script>
import {Review} from "../models/review.entity.js";

export default {
  name: "review-card",
  props: {
    review: {
      type: Review,
      required: true
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    }
  }
}
</script>

<template>
  <div class="flex justify-between items-center mb-2">
    <div class="flex items-center gap-2">
      <pv-avatar label="JD" shape="circle" class="bg-primary text-white" />
      <div>
        <p class="font-bold m-0">{{ review.driverName }}</p>
        <small class="text-sm text-gray-500">{{ formatDate(review.createdAt) }}</small>
      </div>
    </div>
    <pv-rating :value="review.rating" readonly :cancel="false" />
  </div>
  <p class="m-0 text-gray-700">{{ review.comment }}</p>
</template>

<style scoped>

</style>