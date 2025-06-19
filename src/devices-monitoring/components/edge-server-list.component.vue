<script>
import EdgeServerCard from "./edge-server-card.component.vue";

export default {
  name: "edge-server-list",
  emits: ['server-id-selected'],
  components: {EdgeServerCard},
  props: {
    edgeServers: {
      type: Array,
      required: true,
    },
  },
  computed: {
    hasEdgeServers() {
      return this.edgeServers && this.edgeServers.length > 0;
    },
  },
  methods: {
    onServerIdSelected(edgeServerId) {
      this.$emit('server-id-selected', edgeServerId);
    },
  }
}
</script>

<template>
  <div class="edge-server-list">
    <h2 class="text-4xl font-bold mb-2">Edge Servers</h2>
    <p v-if="!hasEdgeServers">No edge servers available.</p>
    <div v-else class="edge-server-cards">
      <edge-server-card
        v-for="server in edgeServers"
        :key="server.id"
        :edgeServer="server"
        v-on:server-id-selected="onServerIdSelected($event)"
      />
    </div>
  </div>
</template>

<style scoped>

</style>