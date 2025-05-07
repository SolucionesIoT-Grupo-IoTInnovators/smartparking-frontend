<script>
export default {
  name: "side-nav",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    links: [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        to: '/home'
      },
      {
        label: 'About',
        icon: 'pi pi-fw pi-info',
        to: '/about'
      },
      {
        label: 'Contact',
        icon: 'pi pi-fw pi-phone',
        to: '/contact'
      }
    ]
  }
}
</script>

<template>
  <div class="sidebar" :class="{ 'visible': visible }">
    <router-link to="/reservations" class="active">Reservations</router-link>
  </div>
</template>

<style scoped>
.sidebar {
  background-color: #f1f1f1;
  overflow: auto;
  height: 100%;
  width: 100%;
  transition: all 0.3s ease;
}

.sidebar:not(.visible) {
  width: 0;
  overflow: hidden;
}

.sidebar a,
.sidebar >>> router-link {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
}

.sidebar a.active,
.sidebar >>> router-link.active {
  background-color: #2196F3;
  color: white;
}

.sidebar a:hover:not(.active),
.sidebar >>> router-link:hover:not(.active) {
  background-color: #555;
  color: white;
}

@media screen and (max-width: 700px) {
  .sidebar {
    height: auto;
  }

  .sidebar a,
  .sidebar >>> router-link {
    float: left;
  }
}

@media screen and (max-width: 400px) {
  .sidebar a,
  .sidebar >>> router-link {
    text-align: center;
    float: none;
  }
}
</style>