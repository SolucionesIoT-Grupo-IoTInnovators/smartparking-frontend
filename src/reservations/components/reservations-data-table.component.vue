<script>
import {ReservationService} from "../services/reservation.service.js";
import {FilterMatchMode, FilterOperator} from '@primevue/core/api';

export default {
  name: "reservations-data-table",
  props: {
    parkingId: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      reservations: [],
      reservationService: null,
      loading: true,
      error: null,
      filters: null,
      statuses: [
        { label: this.$t('reservationData.pending'), value: 'PENDING' },
        { label: this.$t('reservationData.confirmed'), value: 'CONFIRMED' },
        { label: this.$t('reservationData.canceled'), value: 'CANCELED' },
        { label: this.$t('reservationData.completed'), value: 'COMPLETED' }
      ]
    }
  },
  methods: {
    formatCurrency(value) {
      return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    },
    async refreshData() {
      await this.fetchData();
    },
    async fetchData() {
      this.loading = true;
      try {
        const response = await this.reservationService.getAllReservationsByParkingId(this.parkingId);
        this.reservations = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    initFilters() {
      this.filters = {
        global: {value: null, matchMode: FilterMatchMode.CONTAINS}
      }
    },
    clearFilter() {
      this.initFilters();
    },
    getStatusLabel(status) {
      switch (status) {
        case 'COMPLETED':
          return 'success';
        case 'CANCELED':
          return 'danger';
        case 'PENDING':
          return 'warning';
        case 'CONFIRMED':
          return 'info';
      }
    },
    exportCSV() {
      this.$refs.dt.exportCSV();
    }
  },
  created() {
    this.initFilters();
  },
  async mounted() {
    this.reservationService = new ReservationService();
    await this.fetchData();
  }
}
</script>

<template>
  <pv-data-table v-model:filters="filters" resizableColumns columnResizeMode="fit" filterDisplay="menu" :value="reservations" sortField="date" :sortOrder="-1"
                 stripedRows removableSort tableStyle="min-width: 50rem" :loading="loading" :paginator="true" :rows="10"
                 :showGridlines="true" ref="dt">
    <template #header>
    <div class="flex justify-content-between">
      <pv-button type="button" icon="pi pi-filter-slash" :label="$t('reservationData.clear')" outlined @click="clearFilter()"/>
      <pv-icon-field>
        <pv-icon-field>
          <pv-input-icon>
            <i class="pi pi-search"/>
          </pv-input-icon>
          <pv-input-text v-model="filters['global'].value" :placeholder="$t('reservationData.search')"/>
        </pv-icon-field>
      </pv-icon-field>
      <pv-button icon="pi pi-external-link" rounded raised label="Export" @click="exportCSV" />
      <pv-button icon="pi pi-refresh" rounded raised :label="$t('reservationData.refresh')" @click="refreshData"/>
    </div>
  </template>
    <template #empty> No data found.</template>
    <template #loading> Loading data. Please wait.</template>
    <pv-column field="date" :header="$t('reservationData.date')" :sortable="true " style="width: 20%"/>
    <pv-column field="driverFullName" :header="$t('reservationData.driverFullName')" style="width: 20%"/>
    <pv-column field="vehiclePlate" :header="$t('reservationData.vehiclePlate')" style="width: 20%"/>
    <pv-column field="startTime" :header="$t('reservationData.startTime')" style="width: 20%"/>
    <pv-column field="endTime" :header="$t('reservationData.endTime')" style="width: 20%"/>
    <pv-column field="totalPrice" :header="$t('reservationData.totalPrice')" style="width: 20%">
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.totalPrice) }}
      </template>
    </pv-column>
    <pv-column field="status" :header="$t('reservationData.status')" style="width: 20%">
      <template #body="slotProps">
        <pv-tag :value="slotProps.data.status" :severity="getStatusLabel(slotProps.data.status)"/>
      </template>
    </pv-column>
  </pv-data-table>
</template>

<style scoped>

</style>