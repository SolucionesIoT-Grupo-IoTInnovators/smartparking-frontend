<script>
export default {
  name: "daily-usage-chart",
  props: {
    dailyData: {
      type: Object,
      required: true,
      validator: (value) => {
        return value && value.labels && value.values;
      }
    }
  },
  data() {
    return {
      chartData: null,
      chartOptions: null
    }
  },
  methods: {
    setChartData() {
      const documentStyle = getComputedStyle(document.body);

      return {
        labels: this.dailyData.labels,
        datasets: [
          {
            label: 'Reservaciones por día',
            data: this.dailyData.values,
            backgroundColor: documentStyle.getPropertyValue('--p-green-500'),
            hoverBackgroundColor: documentStyle.getPropertyValue('--p-green-400'),
            borderRadius: 6
          }
        ]
      };
    },
    setChartDataSimulated() {
      const documentStyle = getComputedStyle(document.body);

      return {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        datasets: [
          {
            label: 'Reservaciones por día',
            data: [12, 19, 3, 5, 2, 3, 7],
            fill: true,
            borderColor: documentStyle.getPropertyValue('--p-green-500'),
            backgroundColor: documentStyle.getPropertyValue('--p-green-100'),
            borderRadius: 6
          }
        ]
      };
    },
    setChartOptions() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');

      return {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor
            }
          },
          title: {
            display: true,
            text: 'Reservaciones de los últimos 7 días',
            color: textColor
          },
          tooltip: {
            callbacks: {
              title: (tooltipItems) => {
                return `Fecha: ${tooltipItems[0].label}`;
              },
              label: (tooltipItem) => {
                return `Reservaciones: ${tooltipItem.raw}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 40,
            title: {
              display: true,
              text: 'Cantidad de reservaciones',
              color: textColor
            },
            ticks: {
              color: textColor,
              stepSize: 10,
              callback: (value) => {
                return value % 1 === 0 ? value : '';
              }
            },
            grid: {
              color: documentStyle.getPropertyValue('--p-gray-200'),
              lineWidth: 1
            }
          },
          x: {
            title: {
              display: true,
              text: 'Día',
              color: textColor
            },
            ticks: {
              color: textColor
            },
            grid: {
              color: documentStyle.getPropertyValue('--p-gray-200'),
              lineWidth: 1
            }
          }
        }
      };
    }
  },
  watch: {
    dailyData: {
      handler() {
        if (this.dailyData && this.dailyData.labels) {
          this.chartData = this.setChartData();
          this.chartOptions = this.setChartOptions();
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    if (this.dailyData && this.dailyData.labels) {
      this.chartData = this.setChartDataSimulated();
      this.chartOptions = this.setChartOptions();
    }
  }
}
</script>

<template>
  <div class="card">
    <h3 class="text-center mb-3">Uso de los últimos 7 días</h3>
    <div class="chart-container" style="position: relative;">
      <pv-chart type="line" :data="chartData" :options="chartOptions" v-if="chartData" :height="300"/>
      <div v-else class="text-center p-4">
        <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
        <p>Cargando datos...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
}
</style>