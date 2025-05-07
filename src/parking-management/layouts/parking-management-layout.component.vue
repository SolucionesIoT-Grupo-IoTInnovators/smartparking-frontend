<script>
import {useAuthenticationStore} from "../../iam/services/authentication.store.js";
import {useRouter} from "vue-router";
import SideNav from "../../public/components/side-nav.component.vue";

export default {
  name: "parking-management-layout",
  components: {SideNav},
  data() {
    return {
      visible: true,
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
        <img src="../../assets/images/smartparking_logo.jpeg" alt="Logo" class="logo"/>
        <pv-button icon="pi pi-bars" class="bg-primary" @click="visible = !visible" aria-label="Menu"/>
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
    <side-nav  :visible="visible"/>
    <slot></slot>
  </main>
  <pv-toast />
</template>

<style scoped>
.logo {
  width: 90px;
  height: 60px;
}
</style>