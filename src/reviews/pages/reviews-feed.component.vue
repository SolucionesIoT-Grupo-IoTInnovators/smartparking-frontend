<script>
import { ReviewService } from '../services/review.service.js';
import ReviewList from '../components/review-list.component.vue';
import {useAuthenticationStore} from "../../iam/services/authentication.store.js";

export default {
  name: "reviews-feed",
  components: { ReviewList },
  props: {
    parkingId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      reviews: [],
      loading: true,
      error: null,
      authStore: useAuthenticationStore(),
    }
  },
  created() {
    this.fetchReviews();
  },
  methods: {
    async fetchReviews() {
      try {
        this.loading = true;
        const reviewService = new ReviewService();
        const response = await reviewService.getAllReviewsByParkingId(this.authStore.currentParkingId);
        this.reviews = response.data;
      } catch (err) {
        this.error = 'Error fetching reviews. Please try again later.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<template>
  <div class="reviews-feed">
    <h2 class="text-2xl text-primary md:text-3xl lg:text-4xl mb-4"> {{ $t('userReviews') }} </h2>

    <div v-if="loading" class="flex justify-content-center">
      <pv-progress-spinner />
    </div>

    <div v-else-if="error" class="p-4 bg-red-100 text-red-700 border-round">
      {{ error }}
    </div>

    <div v-else-if="reviews.length === 0" class="p-4 text-center text-gray-500">
      No reviews available for this parking.
    </div>

    <review-list v-else :reviews="reviews" />
  </div>
</template>

<style scoped>
.reviews-feed {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

@media (max-width: 1020px) {
  .reviews-feed {
    width: 100%;
    padding: 0.5rem;
  }
}

</style>