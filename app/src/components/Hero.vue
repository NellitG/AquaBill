<template>
  <div class="bg-gray-50 min-h-screen p-4 sm:p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <header class="mb-8">
        <h1 class="text-5xl font-sembold text-blue-400">Dashboard</h1>
        <p class="text-gray-950 mt-1 text-2xl font-light">
          Overview of your water billing management system
        </p>
      </header>

      <!-- Key Metric Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Card 1: Total Clients -->
        <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col justify-between">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-sm font-medium text-gray-500">Total Clients</h3>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-500 opacity-80" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <p class="text-3xl font-semibold text-gray-900">
            {{ totalClients }}
          </p>
        </div>

        <!-- Card 2: Total Readings -->
        <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col justify-between">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-sm font-medium text-gray-500">Total Readings</h3>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-500 opacity-80" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <p class="text-3xl font-semibold text-gray-900">
            {{ totalReadings }}
          </p>
        </div>

        <!-- Card 3: Total Revenue -->
        <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col justify-between">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-sm font-medium text-gray-500">Total Revenue</h3>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-400 opacity-80" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <p class="text-3xl font-semibold text-gray-900">
            Sh {{ totalRevenue.toLocaleString() }}
          </p>
        </div>

        <!-- Card 4: This Month Revenue -->
        <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col justify-between">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-sm font-medium text-gray-500">This Month</h3>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-400 opacity-80" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
          </div>
          <p class="text-3xl font-semibold text-gray-900">
            Sh {{ monthRevenue.toLocaleString() }}
          </p>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Monthly Consumption Chart -->
        <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">
            Monthly Consumption
          </h2>
          <apexchart type="bar" height="300" :options="consumptionChartOptions" :series="consumptionSeries" />
        </div>

        <!-- Revenue Trend Chart -->
        <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">
            Revenue Trend
          </h2>
          <apexchart type="line" height="300" :options="revenueChartOptions" :series="revenueSeries" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const totalClients = ref(0);
const totalReadings = ref(0);
const totalRevenue = ref(0);
const monthRevenue = ref(0);

const consumptionSeries = ref([{ name: "Consumption", data: [] }]);
const revenueSeries = ref([{ name: "Revenue", data: [] }]);

const consumptionChartOptions = ref({
  chart: { toolbar: { show: false } },
  xaxis: { categories: [] },
  colors: ["#3b82f6"],
});

const revenueChartOptions = ref({
  chart: { toolbar: { show: false } },
  stroke: { curve: "smooth" },
  xaxis: { categories: [] },
  colors: ["#10b981"],
});

const resetDashboard = () => {
  totalClients.value = 0;
  totalReadings.value = 0;
  totalRevenue.value = 0;
  monthRevenue.value = 0;

  consumptionSeries.value = [{ name: "Consumption", data: [] }];
  revenueSeries.value = [{ name: "Revenue", data: [] }];

  consumptionChartOptions.value.xaxis.categories = [];
  revenueChartOptions.value.xaxis.categories = [];
};

onMounted(async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    resetDashboard();
    return;
  }

  try {
    const baseURL = import.meta.env.VITE_API_URL;

    const res = await fetch(`${baseURL}/api/dashboard-stats/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (res.status === 401 || res.status === 403) {
      resetDashboard();
      return;
    }

    const data = await res.json();

    totalClients.value = data.total_clients;
    totalReadings.value = data.total_readings;
    totalRevenue.value = data.total_revenue;
    monthRevenue.value = data.month_revenue;

    consumptionSeries.value = [
      { name: "Consumption", data: data.monthly_consumption.values },
    ];
    consumptionChartOptions.value.xaxis.categories =
      data.monthly_consumption.months;

    revenueSeries.value = [
      { name: "Revenue", data: data.revenue_trend.values },
    ];
    revenueChartOptions.value.xaxis.categories =
      data.revenue_trend.months;
  } catch (error) {
    console.error("Failed to load dashboard data:", error);
    resetDashboard(); 
  }
});
</script>


<style scoped>
body {
  font-family: "Inter", sans-serif;
}
</style>

<style scoped>
body {
  font-family: "Inter", sans-serif;
}
</style>
