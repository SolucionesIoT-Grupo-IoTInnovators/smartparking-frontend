<script>
import {DeviceService} from "../services/device.service.js";

export default {
  name: 'DevicesTable',
  emits: ['mac-address-updated'],
  props: {
    devices: {
      type: Array,
      required: true
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      deviceService: null
    };
  },
  methods: {
    onCellEditComplete(event) {
      const { data, field, newValue } = event;
      if (field === 'macAddress') {
        this.updateDeviceMacAddress(data.id, newValue);
      }
    },
    async updateDeviceMacAddress(deviceId, newMacAddress) {
      // Logic to update the device's MAC address
      this.deviceService = new DeviceService();
      await this.deviceService.updateDeviceMacAddress(deviceId, newMacAddress)
        .then(response => {
          if (response.status === 200) {
            this.$toast.add({
              severity: 'success',
              summary: 'MAC Address Updated',
              detail: `Device ID ${deviceId} MAC Address updated successfully.`,
              life: 3000
            });
            this.$emit('mac-address-updated');
          } else {
            this.$toast.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update MAC Address.',
              life: 3000
            });
          }
        })
        .catch(error => {
          console.error('Error updating MAC Address:', error);
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update MAC Address.',
            life: 3000
          });
        });
    }
  },
  mounted() {
    // Any initialization logic can go here
  }
}
</script>

<template>
  <pv-data-table v-if="show" resizable-columns column-resize-mode="fit" :value="devices" sort-field="lastCommunication"
                 :sort-order="-1" edit-mode="cell" @cell-edit-complete="onCellEditComplete"
                 striped-rows removable-sort table-style="min-width: 50rem" :paginator="true" :rows="10"
                 :show-gridlines="true">
    <template #empty>No devices found.</template>
    <pv-column header="Last Communication" :sortable="true" style="width: 20%">
      <template #body="slotProps">
        {{ new Date(slotProps.data.lastCommunication).toLocaleString() }}
      </template>
    </pv-column>
    <pv-column field="parkingSpotId" header="Spot ID" style="width: 10%"/>
    <pv-column field="spotLabel" header="Spot Label" style="width: 10%"/>
    <pv-column field="spotStatus" header="Spot Status" style="width: 20%">
      <template #body="slotProps">
        <span :class="{
          'text-success': slotProps.data.spotStatus === 'AVAILABLE',
          'text-danger': slotProps.data.spotStatus === 'OCCUPIED',
          'text-warning': slotProps.data.spotStatus === 'RESERVED',
        }">{{ slotProps.data.spotStatus }}</span>
      </template>
    </pv-column>
    <pv-column field="macAddress" header="MAC Address" style="width: 20%">
      <template #editor="{data, field}">
        <pv-input-text v-model="data[field]" placeholder="Enter MAC Address" />
      </template>
    </pv-column>
    <pv-column field="type" header="Type" style="width: 20%"/>
    <pv-column field="operationalStatus" header="Status" style="width: 20%">
      <template #body="slotProps">
        <span :class="{
          'text-success': slotProps.data.operationalStatus === 'ONLINE',
          'text-danger': slotProps.data.operationalStatus === 'OFFLINE',
          'text-warning': slotProps.data.operationalStatus === 'UNKNOWN'
        }">{{ slotProps.data.operationalStatus }}</span>
      </template>
    </pv-column>
  </pv-data-table>
</template>

<style scoped>
.text-success {
  background-color: green;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
}

.text-danger {
  background-color: red;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
}

.text-warning {
  background-color: orange;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
}
</style>