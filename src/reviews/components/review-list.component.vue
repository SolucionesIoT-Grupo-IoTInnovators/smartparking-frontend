<script>
import ReviewCard from "./review-card.component.vue";

export default {
  name: "review-list",
  components: {ReviewCard},
  props: {
    reviews: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <div class="grid gap-4 align-items-center justify-content-center w-full">
    <div v-for="review in reviews" :key="review.id" class="p-4 border-round shadow-2 bg-white">
      <review-card :review="review" class="w-full col-12 md:col-6 "/>
    </div>
  </div>
</template>

<style scoped>

</style>