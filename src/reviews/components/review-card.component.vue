<script>

export default {
  name: "review-card",
  props: {
    review: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    }
  },
  computed: {
    driverFirstTwoLetters() {
      return this.review.driverName ? this.review.driverName.slice(0, 2).toUpperCase() : '';
    }
  }
}
</script>

<template>
  <div class="flex justify-between items-center mb-2">
    <div class="flex items-center gap-2">
      <pv-avatar :label="driverFirstTwoLetters" shape="circle" class="bg-primary text-white" />
      <div>
        <p class="font-bold m-0">{{ review.driverName }}</p>
        <small class="text-sm text-gray-500">{{ formatDate(review.createdAt) }}</small>
      </div>
    </div>
    <pv-rating v-model="review.rating" readonly :cancel="false" />
  </div>
  <p class="m-0 text-gray-700">{{ review.comment }}</p>
</template>

<style scoped>

</style>