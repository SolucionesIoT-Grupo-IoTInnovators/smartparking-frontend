<script>
export default {
  name: "side-nav",
  props: {
    visible: {
      type: Boolean,
      default: false
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
      Reservations
    </router-link>
  </div>
</template>

<style scoped>
.sidebar {
  background-color: #ffffff;
  border-right: 1px solid #e0e0e0; /* Borde sutil */
  height: 100vh;
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.3s ease;
  transform: translateX(-100%);
  z-index: 1000;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar.visible {
  transform: translateX(0);
}

.nav-link {
  display: block;
  color: #333333;
  padding: 15px 20px;
  text-decoration: none;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.nav-link:hover:not(.active) {
  background-color: #f5f5f5;
  color: #3498db;
  border-left-color: #3498db;
}

.nav-link.active {
  background-color: #2196F3;
  color: white;
  border-left-color: #ecf0f1;
}

/* Responsive styles */
@media screen and (max-width: 768px) {
  .sidebar {
    width: 200px;
  }
}

@media screen and (max-width: 480px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
    transform: translateX(0);
    display: none;
  }

  .sidebar.visible {
    display: block;
  }

  .nav-link {
    padding: 12px 15px;
    text-align: center;
    border-left: none;
    border-bottom: 3px solid transparent;
  }

  .nav-link:hover:not(.active) {
    border-left: none;
    border-bottom-color: #3498db;
  }

  .nav-link.active {
    border-left: none;
    border-bottom-color: #ecf0f1;
  }
}
</style>