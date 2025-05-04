<script>
import {useAuthenticationStore} from "../../iam/services/authentication.store.js";
import {useRouter} from "vue-router";

export default {
  name: "parking-management-layout",
  data() {
    return {
      authenticationStore: useAuthenticationStore(),
      router: useRouter(),
      items: [
        {
          label: 'Sign Out',
          icon: 'pi pi-fw pi-sign-out',
          command: () => {
            this.authenticationStore.signOut(this.router);
          }
        }
      ]
    }
  },
  computed: {
    currentUsername() {
      const username = localStorage.getItem("username");
      if (username && username.length >= 2) {
        return username.slice(0, 2).toUpperCase();
      } else if (username && username.length === 1) {
        return username.toUpperCase();
      } else {
        return "NA";
      }
    }
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    }
  }
}
</script>

<template>
  <div class="card">
    <pv-toolbar class="bg-primary">
      <template #start>
        <img src="../../assets/images/smart_parking_logo.PNG" alt="Logo" class="logo"/>
      </template>
      <template #center>
        <router-link :to="{ name: 'parking-directory', params: { ownerId: authenticationStore.currentUserId }}"
                     class="text-white text-lg font-bold">
          Parking Directory
        </router-link>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <pv-button type="button" :label="currentUsername" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu"
                     icon="pi pi-user" class="bg-white text-primary"
          />
          <pv-menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
        </div>
      </template>
    </pv-toolbar>
  </div>
  <main>
    <slot></slot>
  </main>
  <pv-toast />
</template>

<style scoped>
.logo {
  width: 100px;
  height: 50px;
}
</style>