<template>
  <div class="bg-gray-50 min-h-screen p-4 sm:p-8">
    <div class="max-w-7xl mx-auto">

      <!-- Header -->
      <div class="mb-6">
        <button
          @click="$router.back()"
          class="mb-3 text-blue-600 hover:underline text-sm flex items-center space-x-1"
        >
          <span>←</span> <span>Back</span>
        </button>

        <h1 class="text-2xl font-bold text-gray-900">Client Details</h1>
        <p class="text-gray-600 text-sm">Full consumption and payment history</p>
      </div>

      <!-- Overview + Stats -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        <!-- Client Card -->
        <div class="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h2 class="text-lg font-semibold mb-4 text-gray-800">Client Profile</h2>
          
          <div class="space-y-3 text-gray-700">
            <p><span class="font-medium">Name:</span> {{ client.name }}</p>
            <p><span class="font-medium">Phone:</span> {{ client.phone }}</p>
            <p><span class="font-medium">Meter Number:</span> {{ client.meter_number }}</p>
            <p><span class="font-medium">Registered:</span> {{ formatDate(client.created_at) }}</p>
          </div>
        </div>

        <!-- Stats -->
        <div class="bg-white p-6 rounded-xl shadow border border-gray-100 lg:col-span-2">
          <h2 class="text-lg font-semibold mb-4 text-gray-800">Summary</h2>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div class="bg-blue-50 p-4 rounded-lg">
              <p class="text-sm text-gray-600">Total Units</p>
              <p class="mt-1 text-2xl font-bold text-gray-900">
                {{ totalUnits }}
              </p>
            </div>

            <div class="bg-green-50 p-4 rounded-lg">
              <p class="text-sm text-gray-600">Total Paid</p>
              <p class="mt-1 text-2xl font-bold text-gray-900">
                Ksh {{ totalPaid }}
              </p>
            </div>

            <div class="bg-red-50 p-4 rounded-lg">
              <p class="text-sm text-gray-600">Balance</p>
              <p class="mt-1 text-2xl font-bold text-gray-900">
                Ksh {{ balance }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Line Chart -->
      <div class="bg-white p-6 rounded-xl shadow border border-gray-100 mb-8">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Monthly Consumption Trend</h2>
        <LineChart
          v-if="chartData.labels.length"
          :labels="chartData.labels"
          :units="chartData.units"
          :amounts="chartData.amounts"
        />
      </div>

      <!-- Transaction Table -->
      <div class="bg-white p-6 rounded-xl shadow border border-gray-100">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Reading & Billing History</h2>

        <table class="min-w-full divide-y divide-gray-200 text-sm">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-2 text-left">Date</th>
              <th class="px-4 py-2 text-left">Units</th>
              <th class="px-4 py-2 text-left">Rate</th>
              <th class="px-4 py-2 text-left">Amount</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-100">
            <tr v-for="r in readings" :key="r.id" class="hover:bg-gray-50">
              <td class="px-4 py-2">{{ formatDate(r.created_at) }}</td>
              <td class="px-4 py-2">{{ r.units_consumed }}</td>
              <td class="px-4 py-2">Ksh {{ r.rate_per_unit }}</td>
              <td class="px-4 py-2 font-medium">Ksh {{ r.amount }}</td>
            </tr>
          </tbody>
        </table>

        <p v-if="readings.length === 0" class="text-center py-6 text-gray-500">
          No readings recorded yet.
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import axios from "axios"
import LineChart from "./LineChart.vue"

const route = useRoute()
const clientId = route.params.id

const client = ref({})
const readings = ref([])

const baseURL = import.meta.env.VITE_API_URL

// Fetch client
async function fetchClient() {
  const res = await axios.get(`${baseURL}/api/clients/${clientId}/`)
  client.value = res.data
}

// Fetch readings
async function fetchReadings() {
  const res = await axios.get(`${baseURL}/api/clients/${clientId}/readings/`)
  readings.value = res.data
}

// Stats
const totalUnits = computed(() =>
  readings.value.reduce((sum, r) => sum + r.units_consumed, 0)
)

const totalPaid = computed(() =>
  readings.value.reduce((sum, r) => sum + r.amount, 0)
)

const balance = computed(() => {
  return Math.max(0, totalPaid.value - totalUnits.value * 120)
})

// Chart Data
const chartData = computed(() => {
  return {
    labels: readings.value.map(r => formatMonth(r.created_at)),
    units: readings.value.map(r => r.units_consumed),
    amounts: readings.value.map(r => r.amount)
  }
})

// Helpers
function formatDate(dateString) {
  const d = new Date(dateString)
  return d.toLocaleDateString()
}

function formatMonth(dateString) {
  const d = new Date(dateString)
  return d.toLocaleString("default", { month: "short", year: "numeric" })
}

// Load data
onMounted(() => {
  fetchClient()
  fetchReadings()
})
</script>

<style scoped>
</style>
