<script>
import {useAuthenticationStore} from "../../iam/services/authentication.store.js";
import {Owner} from "../models/owner.entity.js";
import OwnerCardEdit from "../components/owner-card-edit.component.vue";
import {OwnerService} from "../services/owner.service.js";

export default {
  name: "owner-profile",
  components: {OwnerCardEdit},
  data() {
    return {
      ownerService: null,
      authStore: useAuthenticationStore(),
      owner: null,
      userId: null,
    }
  },
  methods: {
    async getOwnerProfile(userId) {
      try {
        const response = await this.ownerService.getParkingOwnerById(userId);
        if (response && response.data) {
          this.owner = new Owner(response.data);
        } else {
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to fetch owner profile.',
            life: 3000
          });
        }
      } catch (error) {
        console.error("Error fetching owner profile:", error);
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'An error occurred while fetching the owner profile.',
          life: 3000
        });
      }
    },
    handleSave(data) {
      this.$toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Owner profile updated successfully.',
        life: 3000
      });
      this.owner = data;
    }
  },
  async mounted() {
    this.ownerService = new OwnerService();
    this.userId = this.authStore.currentUserId;
    if (this.userId) {
      await this.getOwnerProfile(this.userId);
    } else {
      this.$toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'User ID not found.',
        life: 3000
      });
    }
  }
}
</script>

<template>
  <div class="flex justify-content-center align-items-center ">
    <owner-card-edit :ownerData="owner" v-if="owner" @save="handleSave($event)" class="w-full md:w-8 mt-5"/>
  </div>
</template>

<style scoped>

</style>