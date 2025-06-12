<script>
import {useAuthenticationStore} from "../../iam/services/authentication.store.js";
import {useRouter} from "vue-router";
import SideNav from "../../public/components/side-nav.component.vue";
import LanguageSwitcher from "../../public/components/language-switcher.component.vue";

export default {
  name: "parking-management-layout",
  components: {LanguageSwitcher, SideNav},
  data() {
    return {
      visible: true,
      parkingId: this.$route.params.parkingId,
      authenticationStore: useAuthenticationStore(),
      router: useRouter(),
      items: [
        {
          label: this.$t('toolbar.profile'),
          icon: 'pi pi-fw pi-user',
          command: () => {
            this.router.push({ name: 'owner-profile', params: { ownerId: this.authenticationStore.currentUserId } });
          }
        },
        {
          label: this.$t('toolbar.signOut'),
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
  <div class="layout-container">
    <pv-toolbar class="bg-primary">
      <template #start>
        <pv-button icon="pi pi-bars" class="bg-primary" @click="visible = !visible" aria-label="Menu"/>
        <router-link :to="{ name: 'parking-directory', params: { ownerId: authenticationStore.currentUserId }}">
          <img src="../../assets/images/smartparking_logo.png" alt="Logo" class="logo"/>
        </router-link>
      </template>
      <template #center>
        <router-link :to="{ name: 'parking-directory', params: { ownerId: authenticationStore.currentUserId }}"
                     class="text-white text-lg font-bold hidden md:block">
          {{ $t('toolbar.parkingDirectory') }}
        </router-link>
      </template>
      <template #end>
        <language-switcher />
        <div class="flex items-center gap-2">
          <pv-button type="button" :label="currentUsername" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu"
                     icon="pi pi-user" class="bg-white text-primary"
          />
          <pv-menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
        </div>
      </template>
    </pv-toolbar>

    <div class="content-wrapper">
      <side-nav :visible="visible" :parkingId="authenticationStore.currentParkingId" class="side-navigation"/>
      <div class="main-content" :class="{ 'content-expanded': !visible }">
        <slot></slot>
      </div>
    </div>
  </div>
  <pv-toast />
</template>

<style scoped>
.logo {
  height: 60px;
}

.layout-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content-wrapper {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.side-navigation {
  position: relative !important;
  transform: none !important;
  height: 100%;
  transition: width 0.3s ease;
}

.main-content {
  flex: 1;
  overflow: auto;
  padding: 1rem;
  transition: margin-left 0.3s ease;
}

.content-expanded {
  margin-left: 0;
}

.p-button{
  height: 5vh;
}
@media screen and (width: 768px) {
  .logo {
    height: 5vh;
  }
  .content-wrapper {
    flex-direction: column;
  }

  .side-navigation {
    width: 100%;
    height: auto;
    max-height: 0;
    overflow: hidden;
  }

  .side-navigation.visible {
    max-height: 300px; /* Ajusta según necesites */
  }
}

/* Responsive for mobile */
@media (max-width: 768px) {
  .layout-container {
    flex-direction: column;
  }

  .content-wrapper {
    flex-direction: column;
  }

  .side-navigation {
    width: 100%;
    height: auto;
    max-height: 0;
    overflow: hidden;
  }

  .side-navigation.visible {
    max-height: 300px; /* Ajusta según necesites */
  }
}
</style>