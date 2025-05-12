<script>
import {ParkingService} from "../services/parking.service.js";

export default {
  name: "parking-spot-viewer",
  props: {
    parking: {
      type: Object,
      required: true,
    }
  },
  emits: ['parking-spot-selected'],
  data() {
    return {
      parkingSpots: [],
      selectedParkingSpot: null,
      parkingService: null,
      grid: []
    }
  },
  async created() {
    try {
      this.parkingService = new ParkingService();

      this.initializeGrid();

      const response = await this.parkingService.getAllParkingSpotsByParkingId(this.parking.id);
      this.parkingSpots = response.data;
      this.populateGridWithSpots();
    } catch (error) {
      console.error("Error loading parking spots:", error);
    }
  },
  methods: {
    initializeGrid() {
      this.grid = [];
      for (let row = 0; row < this.parking.totalRows; row++) {
        const rowArray = [];
        for (let col = 0; col < this.parking.totalColumns; col++) {
          rowArray.push({
            type: 'aisle',
            label: '',
            row,
            col,
          });
        }
        this.grid.push(rowArray);
      }
    },
    populateGridWithSpots() {
      for (const spot of this.parkingSpots) {
        const row = spot.rowIndex;
        const col = spot.columnIndex;

        if (row >= 0 && row < this.parking.totalRows &&
            col >= 0 && col < this.parking.totalColumns) {
          this.grid[row][col] = {
            type: 'spot',
            label: spot.label || '',
            id: spot.id,
            row,
            col,
            status: spot.status,
          };
        }
      }
    },
    selectCell(cell) {
      if (cell.type === 'aisle') {
        this.$toast.add({
          severity: 'info',
          summary: 'Information',
          detail: 'This is an aisle, choose a parking spot.',
          life: 3000
        });
        this.selectedParkingSpot = null;
        this.$emit('parking-spot-selected', null);
        return;
      }

      switch (cell.status) {
        case 'AVAILABLE':
          const selectedData = {
            id: cell.id,
            label: cell.label,
            status: cell.status
          };
          this.selectedParkingSpot = selectedData;
          console.log('Selected cell:', selectedData);
          this.$emit('parking-spot-selected', selectedData);
          break;
        case 'RESERVED':
          this.$toast.add({
            severity: 'warn',
            summary: 'Warning',
            detail: 'This parking spot is reserved.',
            life: 3000
          });
          this.selectedParkingSpot = null;
          this.$emit('parking-spot-selected', null);
          break;
        case 'OCCUPIED':
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'This parking spot is occupied.',
            life: 3000
          });
          this.selectedParkingSpot = null;
          this.$emit('parking-spot-selected', null);
          break;
        default:
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unknown status.',
            life: 3000
          });
          this.selectedParkingSpot = null;
          this.$emit('parking-spot-selected', null);
          break;
      }
    }
  }
}
</script>

<template>
  <div class="parking-grid">
    <div v-if="grid.length === 0" class="loading">
      <p>Loading parking spots...</p>
    </div>

    <table v-else>
      <tbody>
      <tr v-for="(row, rowIndex) in grid" :key="rowIndex">
        <td
            v-for="(cell, colIndex) in row"
            :key="colIndex"
            :class="[
              cell.type,
              cell.type === 'spot' ? cell.status.toLowerCase() : ''
            ]"
            @click="selectCell(cell)"
        >
          {{ cell.label }}
        </td>
      </tr>
      </tbody>
    </table>
    <div class="parking-legend">
      <div class="legend-item">
        <div class="color-box available"></div>
        <span>Available</span>
      </div>
      <div class="legend-item">
        <div class="color-box reserved"></div>
        <span>Reserved</span>
      </div>
      <div class="legend-item">
        <div class="color-box occupied"></div>
        <span>Occupied</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading {
  padding: 20px;
  text-align: center;
  color: #666;
  font-style: italic;
}

.parking-grid {
  display: inline-block;
  margin-top: 20px;
}

table {
  border-collapse: collapse;
  margin: 0 auto;
}

td {
  width: 40px;
  height: 40px;
  border: 1px solid #bbb;
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  transition: background 0.3s ease-in-out;
}

td.aisle {
  background-color: #d9d9d9; /* Softer gray */
}

td.spot {
  background-color: #007bff; /* Modern blue */
  color: white;
  border-radius: 5px; /* Rounded corners */
  box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.2);
}

td.spot.available {
  background-color: #3B82F6;
}

td.spot.reserved {
  background-color: #e7de2f;
}

td.spot.occupied {
  background-color: red;
}

td:hover {
  opacity: 0.7; /* Hover effect */
}

.parking-legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 15px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.color-box {
  width: 20px;
  height: 20px;
  border-radius: 3px;
}

.color-box.available {
  background-color: #3B82F6;
}

.color-box.reserved {
  background-color: #e7de2f;
}

.color-box.occupied {
  background-color: red;
}
</style>