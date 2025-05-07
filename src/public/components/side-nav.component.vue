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
    <router-link :to="{ name: 'home', params: { parkingId: parkingId } }" class="nav-link" active-class="active" />
    <router-link :to="{ name: 'reservations-data'}" class="nav-link" active-class="active" />
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

router-link {
  color: black;
  text-decoration: none;
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