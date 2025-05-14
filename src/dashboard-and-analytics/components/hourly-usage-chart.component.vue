<script>
export default {
  name: "hourly-usage-chart",
  props: {
    hourlyData: {
      type: Array,
      required: true
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

      const labels = Array.from({length: 24}, (_, i) => {
        return i === 0 ? '12 AM' :
            i < 12 ? `${i} AM` :
                i === 12 ? '12 PM' :
                    `${i - 12} PM`;
      });

      return {
        labels: labels,
        datasets: [
          {
            label: 'Reservaciones por hora',
            data: this.hourlyData,
            backgroundColor: documentStyle.getPropertyValue('--p-blue-500'),
            hoverBackgroundColor: documentStyle.getPropertyValue('--p-blue-400')
          }
        ]
      };
    },
    setChartDataSimulated() {
      const documentStyle = getComputedStyle(document.body);

      return {
        labels: ['8 AM', '9 AM', '10 AM', '11 AM',
          '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM'],
        datasets: [
          {
            label: 'Reservaciones por hora',
            data: [
              5, 10, 15, 20, 25, 30, 35, 40, 45, 50,
              55, 60, 65, 70, 75, 80
            ],
            backgroundColor: documentStyle.getPropertyValue('--p-blue-500'),
            hoverBackgroundColor: documentStyle.getPropertyValue('--p-blue-400'),
            borderRadius: 6,
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
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor
            }
          },
          title: {
            display: true,
            text: 'Distribución de Reservaciones por Hora del Día',
            color: textColor
          },
          tooltip: {
            callbacks: {
              title: (tooltipItems) => {
                return `Hora: ${tooltipItems[0].label}`;
              },
              label: (tooltipItem) => {
                return `Reservaciones: ${tooltipItem.raw}`;
              }
            }
          }
        },
        scales: {
          y: {
            max: 100,
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cantidad de reservaciones',
              color: textColor
            },
            ticks: {
              color: textColor,
              stepSize: 20,
              callback: (value) => `${value}`,
            }
          },
          x: {
            title: {
              display: true,
              text: 'Hora del día',
              color: textColor
            },
            ticks: {
              color: textColor
            }
          }
        }
      };
    }
  },
  watch: {
    hourlyData: {
      handler() {
        this.chartData = this.setChartData();
        this.chartOptions = this.setChartOptions();
      },
      immediate: true
    }
  },
  mounted() {
    this.chartData = this.setChartDataSimulated();
    this.chartOptions = this.setChartOptions();
  }
}
</script>

<template>
  <div class="card">
    <h3 class="text-center mb-3">Uso por Hora</h3>
    <div class="chart-container" style="position: relative;">
      <pv-chart type="bar" :data="chartData" :options="chartOptions" :height="300"/>
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