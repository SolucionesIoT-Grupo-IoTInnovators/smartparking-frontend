<template>
  <component :is="layout">
    <router-view/>
  </component>
</template>

<script>
import {useAuthenticationStore} from "./iam/services/authentication.store.js";
import ParkingManagementLayout from "./parking-management/layouts/parking-management-layout.component.vue";
import EmptyLayout from "./shared/layouts/empty-layout.component.vue";

export default {
  name: "app",
  components: {ParkingManagementLayout, EmptyLayout},
  computed: {
    layout() {
      return this.$route.meta.layout || 'ParkingManagementLayout';
    }
  },
  mounted() {
    //window.addEventListener('beforeunload', this.handleBeforeUnload);
  },
  beforeUnmount() {
    //window.removeEventListener('beforeunload', this.handleBeforeUnload);
  },
  methods: {
    handleBeforeUnload() {
      const authStore = useAuthenticationStore();
      if (authStore.isSignedIn) {
        authStore.signOut(this.router)
      }
    }
  }
}
</script>

<style scoped>

</style>