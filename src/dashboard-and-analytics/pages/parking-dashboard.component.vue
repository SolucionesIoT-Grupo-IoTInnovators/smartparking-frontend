<script>
import {ReservationService} from "../../reservations/services/reservation.service.js";
import HourlyUsageChart from "../components/hourly-usage-chart.component.vue";
import DailyUsageChart from "../components/daily-usage-chart.component.vue";
import MonthlyEarningsChart from "../components/monthly-earning-chart.component.vue";
import AverageDurationChart from "../components/average-duration-chart.component.vue";

export default {
  name: "parking-dashboard",
  components: {AverageDurationChart, MonthlyEarningsChart, DailyUsageChart, HourlyUsageChart},
  data() {
    return {
      reservationService: null,
      reservations: [],
      hourlyData: null,
      dailyData: null,
      monthlyData: null,
      averageDurationByDay: null,
    }
  },
  async mounted() {
    await this.refreshData();
  },
  methods: {
    async refreshData() {
      const parkingId = Number(localStorage.getItem("parkingId"));
      this.reservationService = new ReservationService();
      const response = await this.reservationService.getAllReservationsByParkingId(parkingId);

      if (response.status === 200) {
        this.reservations = response.data;
        this.hourlyData = await this.calculateHourlyUsage(this.reservations);
        this.dailyData = this.calculateDailyUsage(this.reservations);
        this.monthlyData = this.calculateMonthlyEarnings(this.reservations);
        this.averageDurationByDay = this.calculateAverageDurationByDay(this.reservations);
      } else {
        console.error("Error fetching reservations:", response.status);
      }
    },
    async calculateHourlyUsage(reservations) {
      const hourlyUsage = Array(24).fill(0);

      await reservations.forEach(reservation => {
        const hour = new Date('1970-01-01T' + reservation.startTime).getHours();
        hourlyUsage[hour]++;
      });

      return hourlyUsage;
    },
    calculateDailyUsage(reservations) {
      const dailyCount = {};

      const today = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 6);

      for (let i = 0; i < 7; i++) {
        const date = new Date(sevenDaysAgo);
        date.setDate(sevenDaysAgo.getDate() + i);
        const label = date.toLocaleDateString('es-PE', { day: '2-digit', month: 'short' });
        dailyCount[label] = 0;
      }

      reservations.forEach(reservation => {
        // Descomponemos y reconstruimos en local
        const [year, month, day] = reservation.date.split('-').map(Number);
        const reservationDate = new Date(year, month - 1, day); // local timezone

        if (reservationDate >= sevenDaysAgo && reservationDate <= today) {
          const label = reservationDate.toLocaleDateString('es-PE', { day: '2-digit', month: 'short' });
          dailyCount[label] = (dailyCount[label] || 0) + 1;
        }
      });

      return {
        labels: Object.keys(dailyCount),
        values: Object.values(dailyCount)
      };
    },
    calculateMonthlyEarnings(reservations) {
      const monthlyEarnings = {};

      // Procesar cada reserva para acumular ingresos por mes
      reservations.forEach(reservation => {
        // Extraer la fecha y convertirla correctamente
        const [year, month, day] = reservation.date.split('-').map(Number);
        const reservationDate = new Date(year, month - 1, day);

        // Obtener el nombre del mes en español
        const monthName = reservationDate.toLocaleDateString('es-PE', { month: 'long' });

        // Acumular el precio total en el mes correspondiente
        monthlyEarnings[monthName] = (monthlyEarnings[monthName] || 0) + reservation.totalPrice;
      });

      // Devolver los datos en formato adecuado para el gráfico
      return {
        labels: Object.keys(monthlyEarnings),
        values: Object.values(monthlyEarnings)
      };
    },
    calculateAverageDurationByDay(reservations) {
      const dailyDurations = {};
      const counts = {};

      reservations.forEach(reservation => {
        const [year, month, day] = reservation.date.split('-').map(Number);
        const start = new Date(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${reservation.startTime}`);
        const end = new Date(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${reservation.endTime}`);

        const hours = (end - start) / (1000 * 60 * 60);

        const weekDay = new Date(year, month - 1, day).toLocaleDateString('es-PE', { weekday: 'short' });

        dailyDurations[weekDay] = (dailyDurations[weekDay] || 0) + hours;
        counts[weekDay] = (counts[weekDay] || 0) + 1;
      });

      const averageDurations = {};
      Object.keys(dailyDurations).forEach(day => {
        averageDurations[day] = +(dailyDurations[day] / counts[day]).toFixed(2);
      });

      const daysOrder = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'];
      const sortedDays = Object.keys(averageDurations).sort((a, b) =>
          daysOrder.indexOf(a.toLowerCase()) - daysOrder.indexOf(b.toLowerCase())
      );

      return {
        labels: sortedDays,
        values: sortedDays.map(day => averageDurations[day])
      };
    }
  }
}
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <h1 class="text-2xl md:text-3xl lg:text-4xl text-primary font-bold">Dashboard</h1>
    </div>
    <div class="col-12 md:col-6">
      <hourly-usage-chart :hourlyData="hourlyData" v-if="hourlyData"/>
    </div>
    <div class="col-12 md:col-6">
      <daily-usage-chart :dailyData="dailyData" v-if="dailyData"/>
    </div>
    <div class="col-12 md:col-6">
      <monthly-earnings-chart :monthlyData="monthlyData" v-if="monthlyData"/>
    </div>
    <div class="col-12 md:col-6">
      <average-duration-chart :durationData="averageDurationByDay" v-if="averageDurationByDay"/>
    </div>
  </div>
</template>

<style scoped>

</style>