<script>
export default {
  name: "side-nav",
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    parkingId: {
      type: Number,
      default: null
    }
  },
}
</script>

<template>
  <div class="sidebar" :class="{ 'visible': visible }">
    <router-link
        :to="{ name: 'home', params: { parkingId: parkingId } }"
        class="nav-link"
        active-class="active"
        exact
    >
      <i class="pi pi-home mr-2"></i>
      {{ $t('sidebar.home') }}
    </router-link>
    <router-link
        :to="{ name: 'reservations-data' }"
        class="nav-link"
        active-class="active"
    >
      <i class="pi pi-calendar mr-2"></i>
      {{ $t('sidebar.reservations') }}
    </router-link>
    <router-link
        :to="{ name: 'parking-reviews' }"
        class="nav-link"
        active-class="active"
    >
      <i class="pi pi-star mr-2"></i>
      {{ $t('sidebar.reviews') }}
    </router-link>
    <router-link
        :to="{ name: 'dashboard' }"
        class="nav-link"
        active-class="active"
    >
      <i class="pi pi-chart-bar mr-2"></i>
      Dashboard
    </router-link>
    <router-link
        :to="{ name: 'devices-monitoring' }"
        class="nav-link"
        active-class="active"
    >
      <i class="pi pi-desktop mr-2"></i>
      {{ $t('devices.devicesMonitoring') }}
    </router-link>
    <router-link
        :to="{ name: 'parking-profile' }"
        class="nav-link"
        active-class="active"
    >
      <i class="pi pi-cog mr-2"></i>
      {{ $t('sidebar.parkingProfile') }}
    </router-link>
  </div>
</template>

<style scoped>
.sidebar {
  background-color: #ffffff;
  border-right: 1px solid #e0e0e0;
  height: 100vh;
  width: 250px;
  transition: width 0.3s ease, max-height 0.3s ease;
  overflow: hidden;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar.visible {
  padding: 0;
  border-right: none;
}

/* Links */
.nav-link {
  display: block;
  color: #333333;
  padding: 15px 20px;
  text-decoration: none;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
  white-space: nowrap;
  align-content: center;
}

.nav-link.active {
  background-color: #2196F3;
  color: white;
}

/* Mobile */
@media screen and (width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
    transition: max-height 0.3s ease;
  }

  .sidebar.visible {
    max-height: 300px;
  }

  .sidebar.collapsed {
    max-height: 0;
  }
}

</style>