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
      Home
    </router-link>
    <router-link
        :to="{ name: 'reservations-data' }"
        class="nav-link"
        active-class="active"
    >
      {{ $t('reservations') }}
    </router-link>
    <router-link
        :to="{ name: 'parking-reviews' }"
        class="nav-link"
        active-class="active"
    >
      {{ $t('reviews') }}
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