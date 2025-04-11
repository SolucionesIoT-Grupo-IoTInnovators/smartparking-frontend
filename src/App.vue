<template>
  <div class="app-container">
    <h2>Design Your Parking Lot</h2>

    <!-- Tool Controls -->
    <div class="controls">
      <Button label="Parking Spot" icon="pi pi-car" @click="setTool('spot')" />
      <Button label="Aisle" icon="pi pi-bars" @click="setTool('aisle')" />
      <Button label="Reset" icon="pi pi-refresh" @click="resetGrid" class="reset-btn"/>
      <Button label="Optimize" icon="pi pi-check" @click="optimizeGrid" class="optimize-btn"/>
    </div>

    <!-- Parking Grid -->
    <div class="parking-grid">
      <table>
        <tbody>
        <tr v-for="(row, rowIndex) in grid" :key="rowIndex">
          <td
              v-for="(cell, colIndex) in row"
              :key="colIndex"
              :class="cell.type"
              @click="selectCell(rowIndex, colIndex)"
          >
            {{ cell.label }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tool: 'spot', // Selected tool (spot or aisle)
      grid: [], // Parking grid
      r: 8, // Number of rows
      c: 14, // Number of columns
    };
  },
  computed: {
    // Get all assigned parking spots
    parkingSpots() {
      let spots = [];
      this.grid.forEach((row) => {
        row.forEach((cell) => {
          if (cell.type === 'spot') {
            spots.push(cell);
          }
        });
      });
      return spots;
    },
  },
  methods: {
    // Create an empty grid
    createGrid(rows, cols) {
      const grid = [];
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          row.push({ type: 'empty', label: '', row: i, col: j });
        }
        grid.push(row);
      }
      return grid;
    },

    // Change the selected tool
    setTool(tool) {
      this.tool = tool;
    },

    // Function to select or deselect a cell
    selectCell(rowIndex, colIndex) {
      const cell = this.grid[rowIndex][colIndex];

      if (this.tool === 'spot' && cell.type !== 'spot') {
        // Assign new parking spot with correct P-number
        cell.type = 'spot';
        cell.available = true;
        this.updateSpotNumbers();
     } else if (this.tool === 'aisle' && cell.type !== 'aisle') {
        cell.type = 'aisle';
        delete cell.available; // Remove availability for aisle
        delete cell.label; // Remove label for aisle
        delete cell.row;
        delete cell.col;
      } else if (cell.type !== 'empty') {
        // Convert back to empty
        cell.type = 'empty';
        cell.label = '';
      }
      this.updateSpotNumbers();
    },

    // Recalculate the P-numbers for parking spots
    updateSpotNumbers() {
      let count = 1;
      this.grid.forEach((row) => {
        row.forEach((cell) => {
          if (cell.type === 'spot') {
            cell.label = `P${count}`;
            count++;
          }
        });
      });
      console.log(this.grid);
    },

    // Reset the parking grid
    resetGrid() {
      this.grid = this.createGrid(this.r, this.c);
    },

    // Optimize grid by removing empty rows and columns
    optimizeGrid() {
      // Remove empty rows
      let filteredRows = this.grid.filter(row => row.some(cell => cell.type !== "empty"));

      // Remove empty columns
      let firstNonEmptyCol = null;
      let lastNonEmptyCol = null;

      filteredRows.forEach(row => {
        row.forEach((cell, colIndex) => {
          if (cell.type !== "empty") {
            if (firstNonEmptyCol === null || colIndex < firstNonEmptyCol) firstNonEmptyCol = colIndex;
            if (lastNonEmptyCol === null || colIndex > lastNonEmptyCol) lastNonEmptyCol = colIndex;
          }
        });
      });

      this.grid = filteredRows.map(row => {
        return row.slice(firstNonEmptyCol, lastNonEmptyCol + 1).map(cell => {
          if (cell.type === 'empty' && 'available' in cell) {
            delete cell.available;
          }
          return cell;
        });
      });

      console.log("Optimized Grid:", this.grid);
    }
  },
  mounted() {
    // Initialize the parking grid
    this.grid = this.createGrid(this.r, this.c);
  },
};
</script>

<style scoped>
.app-container {
  text-align: center;
  padding: 20px;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
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

td.empty {
  background-color: white;
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

td:hover {
  opacity: 0.7; /* Hover effect */
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>