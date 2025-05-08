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
      filters: null
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
  <pv-data-table v-model:filters="filters" filterDisplay="menu" :value="reservations" sortField="date" :sortOrder="-1"
                 stripedRows removableSort tableStyle="min-width: 50rem" :loading="loading" :paginator="true" :rows="10"
                 :showGridlines="true">
    <template #header>
      <div class="flex justify-content-between">
        <pv-button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()"/>
        <pv-icon-field>
          <pv-icon-field>
            <pv-input-icon>
              <i class="pi pi-search"/>
            </pv-input-icon>
            <pv-input-text v-model="filters['global'].value" placeholder="Keyword Search"/>
          </pv-icon-field>
        </pv-icon-field>
        <pv-button icon="pi pi-refresh" rounded raised label="Refresh" @click="refreshData"/>
      </div>
    </template>
    <template #empty> No data found.</template>
    <template #loading> Loading data. Please wait.</template>
    <pv-column field="date" header="Date" :sortable="true " style="width: 20%"/>
    <pv-column field="driverFullName" header="Driver Full Name" style="width: 20%"/>
    <pv-column field="vehiclePlate" header="Vehicle Plate" style="width: 20%"/>
    <pv-column field="startTime" header="Start Time" style="width: 20%"/>
    <pv-column field="endTime" header="End Time" style="width: 20%"/>
    <pv-column field="totalPrice" header="Total Price" style="width: 20%">
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.totalPrice) }}
      </template>
    </pv-column>
    <pv-column field="status" header="Status" style="width: 20%"/>
  </pv-data-table>
</template>

<style scoped>

</style>