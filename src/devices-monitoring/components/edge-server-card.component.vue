<script>
import {EdgeServer} from "../models/edge-server.entity.js";

export default {
  name: "edge-server-card",
  emits: ['server-id-selected'],
  props: {
    edgeServer: {
      type: EdgeServer,
      required: true,
    },
  },
  computed: {
    maskApiKey() {
      if (!this.edgeServer.apiKey) return 'Not assigned';
      // Display first 4 and last 4 characters, mask the rest
      if (this.edgeServer.apiKey.length <= 8) return this.edgeServer.apiKey;
      return `${this.edgeServer.apiKey.slice(0, 4)}...${this.edgeServer.apiKey.slice(-4)}`;
    },
    formattedHeartbeat() {
      if (!this.edgeServer.lastHeartbeat) return 'Never';
      // Format the date if needed
      try {
        const date = new Date(this.edgeServer.lastHeartbeat);
        return date.toLocaleString();
      } catch (e) {
        return this.edgeServer.lastHeartbeat;
      }
    },
    getStatusSeverity() {
      const statusLower = (this.edgeServer.status || '').toLowerCase();
      if (statusLower === 'online' || statusLower === 'active') return 'success';
      if (statusLower === 'offline') return 'danger';
      if (statusLower === 'warning' || statusLower === 'degraded') return 'warning';
      return 'info';
    }
  },
  methods: {
    copyApiKey() {
      if (this.edgeServer.apiKey) {
        navigator.clipboard.writeText(this.edgeServer.apiKey)
            .then(() => {
              this.$toast.add({
                severity: 'success',
                summary: 'Copied',
                detail: 'API Key copied to clipboard',
                life: 3000
              });
            })
            .catch(() => {
              this.$toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to copy API Key',
                life: 3000
              });
            });
      }
    },
    emitServerId() {
      this.$emit('server-id-selected', this.edgeServer.serverId);
    }
  }
}
</script>

<template>
  <div class="shadow-2 border-round p-2 bg-white max-w-20rem">
    <div class="flex flex-column align-items-center gap-2">
      <div class="flex align-items-center mb-2">
        <i class="pi pi-server text-xl mr-2"></i>
        <h3 class="m-0">{{ edgeServer.name || 'Unnamed Server' }}</h3>
      </div>

      <div class="grid w-full">
        <div class="col-12 md:col-6">
          <span class="font-bold text-sm block text-500">Server ID</span>
          <span class="text-color">{{ edgeServer.serverId || 'Not assigned' }}</span>
        </div>

        <div class="col-12 md:col-6">
          <span class="font-bold text-sm block text-500">API Key</span>
          <span class="flex align-items-center">
                <span class="text-color text-overflow-ellipsis">{{ maskApiKey }}</span>
                <pv-button icon="pi pi-copy" class="p-0" variant="text" size="small"
                           tooltip.top="'Copy API Key'" @click="copyApiKey"/>
              </span>
        </div>
      </div>

      <div class="grid w-full">
          <div class="col-12 md:col-6">
            <span class="font-bold text-sm block text-500">IP Address</span>
            <span class="text-color">{{ edgeServer.ipAddress || 'Not connected' }}</span>
          </div>
          <div class="col-12 md:col-6">
            <span class="font-bold text-sm block text-500">Connected Devices</span>
            <pv-badge :value="edgeServer.connectedDevicesCount" severity="info"></pv-badge>
          </div>
      </div>

      <div class="grid w-full">
          <div class="col-12 md:col-6">
            <span class="font-bold text-sm block text-500">Status</span>
            <pv-tag :severity="getStatusSeverity" :value="edgeServer.status || 'Unknown'"></pv-tag>
          </div>

          <div class="col-12 md:col-6">
            <span class="font-bold text-sm block text-500">Last Heartbeat</span>
            <span class="text-color">{{ formattedHeartbeat }}</span>
          </div>
      </div>

      <pv-button label="View Devices" icon="pi pi-eye" class="mt-2 w-full" variant="primary"
                 @click="emitServerId" raised />
    </div>
  </div>
</template>

<style scoped>

</style>