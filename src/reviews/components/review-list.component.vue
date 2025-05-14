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
  <div class="grid">
    <div v-for="review in reviews" :key="review.id" class="col-12 p-2">
      <div class="p-3 border-round shadow-2 bg-white">
        <review-card :review="review"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos adicionales para mejorar la apariencia en dispositivos móviles */
@media screen and (max-width: 576px) {
  .grid {
    margin: 0;
  }

  .col-12 {
    padding: 0.5rem !important;
  }
}
</style>