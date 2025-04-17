<template>
  <div class="flex-column">
    <router-link v-for="item in items" :key="item.label" v-slot="{navigate, href}" :to="item.to" custom>
      <pv-button :href="href" @click="navigate">{{ item.label }}</pv-button>
    </router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {
      items: [
        { label: 'Registration', to: '/parking/registration' },
      ]
    }
  }
}
</script>

<style scoped>

</style>