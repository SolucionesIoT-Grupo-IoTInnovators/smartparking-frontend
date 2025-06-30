<template>
  <component :is="layout">
    <router-view/>
  </component>
</template>

<script>
import {useAuthenticationStore} from "./iam/services/authentication.store.js";
import AuthLayout from "./iam/layouts/auth-layout.component.vue";
import ParkingManagementLayout from "./parking-management/layouts/parking-management-layout.component.vue";
import EmptyLayout from "./shared/layouts/empty-layout.component.vue";
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from './firebase/firebase.js'; // tu archivo de config
import http from "../src/shared/services/http-common.js"

import axios from 'axios';


export default {
  name: "app",
  components: {ParkingManagementLayout, EmptyLayout, AuthLayout},
  computed: {
    layout() {
      return this.$route.meta.layout || 'ParkingManagementLayout' || 'EmptyLayout' || 'AuthLayout';
    }
  },
  mounted() {
    this.initFcm();
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
    },

    async initFcm() {
      const authStore = useAuthenticationStore();
      const userId = authStore.userId;

      if (!userId || userId === 0) {
        console.warn("Usuario no autenticado, no se puede registrar token FCM.");
        return;
      }

      try {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

        const token = await getToken(messaging, {
          vapidKey: "BNqQEbBmoTo6v3Ng1JF7kHOrpb9RyRfm4DWu4st7LR-2fvNMo--Q7t2iRtemuAP9YnTUOhUKy3eZlj95FpOFRc8",
          serviceWorkerRegistration: registration,
        });

        if (token) {
          await http.post('/notifications/register-token', null, {
            params: {
              userId: userId,
              token: token,
            },
          });
          console.log("Token FCM  registrado correctamente:", token);
        } else {
          console.warn("No se pudo obtener token FCM.");
        }

        onMessage(messaging, (payload) => {
          const { title, body } = payload.notification;
          alert(`${title}: ${body}`);
        });

      } catch (error) {
        console.error("❌ Error al registrar token FCM:", error);
      }
    }
  }

}
</script>

<style scoped>

</style>