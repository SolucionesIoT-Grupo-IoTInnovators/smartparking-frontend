<script>
import {Parking} from "../model/parking.entity.js";

export default {
  name: "parking-summary-card",
  props: {
    parking: {
      type: Parking,
      required: true,
    }
  }
}
</script>

<template>
  <div class="flex flex-column align-items-center justify-content-start gap-2 mx-auto w-full max-w-screen-md">
    <div class="p-2 text-center w-full">
      <p class="text-3xl font-bold text-primary mb-2">{{ parking.name }}</p>
      <p class="text-md text-gray-600">{{ $t('parking-summary-card.overView') }}</p>
    </div>

    <div class="grid w-full">
      <div class="col-12 md:col-4">
        <div class="surface-card p-3 shadow-1 border-round text-center h-full">
          <p class="text-sm text-gray-500 mb-1">{{ $t('parking-summary-card.totalSpots') }}</p>
          <p class="text-2xl font-bold text-primary">{{ parking.totalSpots }}</p>
        </div>
      </div>
      <div class="col-12 md:col-4">
        <div class="surface-card p-3 shadow-1 border-round text-center h-full">
          <p class="text-sm text-gray-500 mb-1">{{ $t('parking-summary-card.available') }}</p>
          <p class="text-2xl font-bold text-green-500">{{ parking.availableSpots }}</p>
        </div>
      </div>
      <div class="col-12 md:col-4">
        <div class="surface-card p-3 shadow-1 border-round text-center h-full">
          <p class="text-sm text-gray-500 mb-1">{{ $t('parking-summary-card.occupied') }} / {{ $t('parking-summary-card.reserved') }}</p>
          <p class="text-2xl font-bold">
            {{ parking.totalSpots - parking.availableSpots }}
          </p>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>