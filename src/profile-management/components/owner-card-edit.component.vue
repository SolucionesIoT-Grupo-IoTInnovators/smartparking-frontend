<script>
import {Owner} from "../models/owner.entity.js";

export default {
  name: "owner-card-edit",
  props: {
    ownerData: {
      type: Owner,
      required: true,
    }
  },
  data() {
    return {
      submitted: false,
    }
  },
  methods: {
    validateForm() {
      this.submitted = true;
      return this.ownerData.fullName && this.ownerData.city && this.ownerData.country &&
             this.ownerData.phone && this.ownerData.ruc && this.ownerData.companyName;
    },
    handleSave() {
      if (this.validateForm()) {
        this.$emit('save', this.ownerData);
        this.submitted = false;
      } else {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please fill in all required fields.',
          life: 3000
        });
      }
    },
  }
}
</script>

<template>
  <div class="flex justify-content-center align-items-center w-full">
    <div class="card p-5 shadow-none w-full lg:w-8">
      <h3 class="text-4xl font-bold mb-5 text-primary text-center m-4">User Profile</h3>
      <div class="formgrid grid">
        <!-- Name -->
        <div class="field col-12 mb-5">
          <pv-float-label>
            <pv-input-text id="name" v-model="ownerData.fullName" class="w-full"
                           :class="{'p-invalid': submitted && !ownerData.fullName}"/>
            <label for="name" class="text-primary">{{ $t('name') }}</label>
          </pv-float-label>
          <small v-if="submitted && !ownerData.fullName" class="p-error">FullName is required</small>
        </div>

        <!-- City -->
        <div class="field col-12 md:col-6 mb-5">
          <pv-float-label>
            <pv-input-text id="city" v-model="ownerData.city" class="w-full"
                           :class="{'p-invalid': submitted && !ownerData.city}"/>
            <label for="city" class="text-primary">{{ $t('city') }}</label>
          </pv-float-label>
          <small v-if="submitted && !ownerData.city" class="p-error">City is required</small>
        </div>

        <!-- Country -->
        <div class="field col-12 md:col-6 mb-5">
          <pv-float-label>
            <pv-input-text id="country" v-model="ownerData.country" class="w-full"
                           :class="{'p-invalid': submitted && !ownerData.country}"/>
            <label for="country" class="text-primary">{{ $t('country') }}</label>
          </pv-float-label>
          <small v-if="submitted && !ownerData.country" class="p-error">Country is required</small>
        </div>

        <!-- Phone -->
        <div class="field col-12 md:col-6 mb-5">
          <pv-float-label>
            <pv-input-text id="phone" v-model="ownerData.phone" class="w-full"
                           :class="{'p-invalid': submitted && !ownerData.phone}"/>
            <label for="phone" class="text-primary">{{ $t('phone') }}</label>
          </pv-float-label>
          <small v-if="submitted && !ownerData.phone" class="p-error">Phone is required</small>
        </div>

        <!-- RUC -->
        <div class="field col-12 md:col-6 mb-5">
          <pv-float-label>
            <pv-input-text id="ruc" v-model="ownerData.ruc" class="w-full"
                           :class="{'p-invalid': submitted && !ownerData.ruc}"/>
            <label for="ruc" class="text-primary">{{ $t('ruc') }}</label>
          </pv-float-label>
          <small v-if="submitted && !ownerData.ruc" class="p-error">RUC is required</small>
        </div>

        <!-- Company Name -->
        <div class="field col-12 mb-5">
          <pv-float-label>
            <pv-input-text id="companyName" v-model="ownerData.companyName" class="w-full"
                           :class="{'p-invalid': submitted && !ownerData.companyName}"/>
            <label for="companyName" class="text-primary">{{ $t('companyName') }}</label>
          </pv-float-label>
          <small v-if="submitted && !ownerData.companyName" class="p-error">Company Name is required</small>
        </div>

        <div class="col-12 flex justify-content-end align-items-center">
          <pv-button label="Edit" icon="pi pi-pencil" raised class="mt-4" @click="handleSave"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: white;
  border: 1px solid #2196F3;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
</style>