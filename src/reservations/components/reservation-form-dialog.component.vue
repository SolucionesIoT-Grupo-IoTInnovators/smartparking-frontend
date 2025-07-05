<script>
import {useAuthenticationStore} from "../../iam/services/authentication.store.js";
import {ReservationService} from "../services/reservation.service.js";

export default {
  name: "reservation-form-dialog",
  props: {
    spot: {
      type: Object,
      required: true
    },
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      reservation: {
        vehiclePlate: '',
        date: '',
        startTime: '',
        endTime: '',
      },
      authStore: null,
      reservationService: null,
      invalidTimeDifference: false,
      submitted: false
    }
  },
  methods: {
    validateForm() {
      this.submitted = true;

      const fieldsPresent = this.reservation.vehiclePlate && this.reservation.startTime && this.reservation.endTime;

      let timeValid = false;

      if (fieldsPresent) {
        const [startHours, startMinutes] = this.reservation.startTime.split(':').map(Number);
        const [endHours, endMinutes] = this.reservation.endTime.split(':').map(Number);

        const startDate = new Date();
        startDate.setHours(startHours, startMinutes, 0);

        const endDate = new Date();
        endDate.setHours(endHours, endMinutes, 0);

        if (endDate < startDate) {
          endDate.setDate(endDate.getDate() + 1);
        }

        const diffMs = endDate - startDate;
        const diffMinutes = diffMs / (1000 * 60);

        timeValid = diffMinutes >= 60;

        this.invalidTimeDifference = !timeValid;
      }

      return fieldsPresent && timeValid;
    },
    resetForm() {
      this.reservation.vehiclePlate = '';
      this.reservation.startTime = '';
      this.reservation.endTime = '';
      this.submitted = false;
    },
    closeDialog() {
      this.resetForm();
      this.$emit('closeD');
    },
    async onSubmitForm() {
      this.authStore = useAuthenticationStore();
      this.reservation.driverId = 2;
      this.reservation.parkingId = Number(localStorage.getItem('parkingId'));
      this.reservation.parkingSpotId = this.spot.id;
      this.reservation.date = new Date();

      this.reservationService = new ReservationService();

      console.log(this.reservation);

      if (this.validateForm()) {
        const response = await this.reservationService.create(this.reservation);
        console.log(response);
        if (response.status === 201) {
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Reservation created successfully',
            life: 3000
          });
          this.resetForm();
          setTimeout(() => {
            this.closeDialog();
            this.$emit('refresh');
          }, 2000);
        } else {
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create reservation',
            life: 3000
          });
        }
      }

    }
  }
}
</script>

<template>
  <pv-dialog v-bind:visible="isVisible" modal :header="$t('reservationData.popUp.title')" :style="{ width: '25rem' }">
    <form @submit.prevent="onSubmitForm" class="w-full">
      <div class="p-fluid">
        <div class="my-4">
          <pv-float-label>
            <pv-input-mask id="vehiclePlate" v-model="reservation.vehiclePlate" mask="a*a-999"
                           :class="{'p-invalid': submitted && !reservation.vehiclePlate }" class="w-full"/>
            <label for="vehiclePlate">{{ $t('reservationData.popUp.vehiclePlate') }}</label>
          </pv-float-label>
          <small v-if="submitted && !reservation.vehiclePlate" class="p-error">
            {{ $t('reservationData.popUp.vehiclePlateRequired') }}
          </small>
        </div>

        <div class="mb-4">
          <pv-float-label>
            <pv-input-mask id="starTime" v-model="reservation.startTime" mask="99:99"
                           :class="{'p-invalid': submitted && !reservation.startTime }" class="w-full"/>
            <label for="starTime">{{ $t('reservationData.popUp.startTime') }}</label>
          </pv-float-label>
          <small v-if="submitted && !reservation.startTime" class="p-error">
            {{ $t('reservationData.popUp.startTimeRequired') }}
          </small>
        </div>

        <div class="mb-4">
          <pv-float-label>
            <pv-input-mask id="endTime" v-model="reservation.endTime" mask="99:99"
                           :class="{'p-invalid': submitted && (!reservation.endTime || invalidTimeDifference)}" class="w-full"/>
            <label for="endTime">{{ $t('reservationData.popUp.endTime') }}</label>
          </pv-float-label>
          <small v-if="submitted && !reservation.endTime" class="p-error">
            {{ $t('reservationData.popUp.endTimeRequired') }}
          </small>
          <small v-if="submitted && reservation.endTime && invalidTimeDifference" class="p-error">
           EndTime must be at least 1 hour after StartTime
          </small>
        </div>

        <div class="flex justify-end gap-2">
          <pv-button @click="closeDialog()" class="w-full font-bold uppercase bg-gray-500">{{ $t('reservationData.popUp.cancel') }}</pv-button>
          <pv-button type="submit" class="w-full font-bold uppercase">{{ $t('reservationData.popUp.register') }}</pv-button>
        </div>
      </div>
    </form>
  </pv-dialog>
</template>

<style scoped>

</style>