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
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: #f1f1f1;
  position: fixed;
  height: 100%;
  overflow: auto;
  transition: transform 0.3s ease;
  transform: translateX(-100%);
}

.sidebar.visible {
  transform: translateX(0);
}

.sidebar a {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
}

.sidebar a.active {
  background-color: #2196F3;
  color: white;
}

.sidebar a:hover:not(.active) {
  background-color: #555;
  color: white;
}

div.content {
  margin-left: 200px;
  padding: 1px 16px;
  height: 1000px;
  transition: margin-left 0.3s ease;
}

div.content:not(.sidebar.visible) {
  margin-left: 0;
}

@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }

  .sidebar.visible {
    transform: translateY(0);
  }

  .sidebar a {
    float: left;
  }

  div.content {
    margin-left: 0;
  }
}

@media screen and (max-width: 400px) {
  .sidebar a {
    text-align: center;
    float: none;
  }
}
</style>