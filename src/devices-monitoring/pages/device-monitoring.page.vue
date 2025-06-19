<script>
import EdgeServerList from '../components/edge-server-list.component.vue';
import {EdgeServerService} from "../services/edge-server.service.js";
import {EdgeServer} from "../models/edge-server.entity.js";
import {DeviceService} from "../services/device.service.js";
import DevicesTable from "../components/devices-table.component.vue";
import {Device} from "../models/device.entity.js";
export default {
  name: "device-monitoring-page",
  components: {DevicesTable, EdgeServerList },
  data() {
    return {
      edgeServers: [],
      edgeServerService: null,
      devices: [],
      deviceService: null,
      selectedServerId: null,
      showDevices: false,
    };
  },
  methods: {
    async getEdgeServers(parkingId) {
      this.edgeServerService = new EdgeServerService();
      await this.edgeServerService.getEdgeServersByParkingId(parkingId).then(response => {
        if (response.status === 200) {
          this.edgeServers = response.data.map(edgeServer => new EdgeServer(edgeServer));
          this.$toast.add({
            severity: 'success',
            summary: 'Edge Servers Loaded',
            detail: `Loaded ${this.edgeServers.length} edge servers.`,
            life: 3000
          });
        } else {
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load edge servers.',
            life: 3000
          });
        }
      })
    },
    async onServerIdSelected(serverId) {
      this.selectedServerId = serverId;
      this.showDevices = true;
      await this.getDevicesByServerId(serverId);
    },
    async getDevicesByServerId(serverId) {
      this.deviceService = new DeviceService();
      await this.deviceService.getDevicesByEdgeServerId(serverId).then(response => {
        if (response.status === 200) {
          this.devices = response.data.map(device => new Device(device));
          this.$toast.add({
            severity: 'success',
            summary: 'Devices Loaded',
            detail: `Loaded ${this.devices.length} devices.`,
            life: 3000
          });
        } else {
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load devices.',
            life: 3000
          });
        }
      });
    },
    onMacAddressUpdated() {
      this.getDevicesByServerId(this.selectedServerId);
    }
  },
  async mounted() {
    const parkingId = Number(localStorage.getItem("parkingId"));
    if (parkingId) {
      await this.getEdgeServers(parkingId);
    } else {
      this.$toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Parking ID not found in local storage.',
        life: 3000
      });
    }
  },
}
</script>

<template>
  <div class="flex flex-column gap-2">
    <edge-server-list :edgeServers="edgeServers" v-on:server-id-selected="onServerIdSelected($event)" />
    <devices-table :devices="devices" :show="showDevices" v-on:mac-address-updated="onMacAddressUpdated" />
  </div>
</template>

<style scoped>

</style>