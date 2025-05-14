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
      const options = {year: 'numeric', month: 'long', day: 'numeric'};
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
  <div class="review-card">
    <div
        class="review-header flex flex-column sm:flex-row justify-content-between align-items-start sm:align-items-center gap-2 mb-3">
      <div class="flex align-items-center gap-2">
        <pv-avatar :label="driverFirstTwoLetters" shape="circle" class="bg-primary text-white flex-shrink-0"/>
        <div class="driver-info">
          <p class="font-bold m-0 text-overflow-ellipsis overflow-hidden">{{ review.driverName }}</p>
          <small class="text-sm text-gray-500 block">{{ formatDate(review.createdAt) }}</small>
        </div>
      </div>
      <pv-rating v-model="review.rating" readonly :cancel="false" class="mt-2 sm:mt-0"/>
    </div>
    <p class="m-0 text-gray-700 line-height-3">{{ review.comment }}</p>
  </div>
</template>

<style scoped>
.review-card {
  width: 100%;
  padding: 0.5rem;
}

.driver-info {
  max-width: 150px;
}

@media screen and (min-width: 576px) {
  .driver-info {
    max-width: 200px;
  }
}

@media screen and (min-width: 768px) {
  .driver-info {
    max-width: 250px;
  }
}

@media screen and (min-width: 992px) {
  .review-card {
    padding: 1rem;
  }

  .driver-info {
    max-width: 300px;
  }
}
</style>