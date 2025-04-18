<script>
import {Parking} from "../model/parking.entity.js";
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
            col
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
            isAvailable: spot.available
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
        return;
      }
      const selectedData = {
        id: cell.id,
        label: cell.label
      };
      this.selectedParkingSpot = selectedData;
      console.log('Selected cell:', selectedData);
      this.$emit('parking-spot-selected', selectedData);
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
              cell.type === 'spot' ? (cell.isAvailable ? 'available' : 'occupied') : ''
            ]"
            @click="selectCell(cell)"
          >
            {{ cell.label }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <pv-toast />
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
  background-color: #3498db;
}

td.spot.occupied {
  background-color: #2c3e50;
}

td:hover {
  opacity: 0.7; /* Hover effect */
}
</style>