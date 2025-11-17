<template>
  <div class="bg-gray-50 min-h-screen p-4 sm:p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Meter Readings</h1>
        <p class="text-gray-500 mt-1">Record and calculate monthly readings</p>
      </header>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Enter Reading -->
        <div class="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100">
          <div class="flex items-center space-x-3 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <div>
              <h2 class="text-xl font-semibold text-gray-800">Enter Reading</h2>
              <p class="text-gray-500 text-sm">Select client and enter meter reading</p>
            </div>
          </div>

          <!-- Form -->
          <form @submit.prevent="calculateBill" class="space-y-6">
            <!-- Select Client -->
            <div>
              <label for="select_client" class="block text-sm font-medium text-gray-700 mb-1">Select Client</label>
              <div class="relative">
                <select
                  id="select_client"
                  v-model="selectedClientId"
                  @change="fetchPreviousReading"
                  class="block w-full p-3 border border-gray-300 rounded-lg appearance-none pr-10 bg-white cursor-pointer transition duration-150"
                >
                  <option disabled value="">-- Select a client --</option>
                  <option v-for="client in clients" :key="client.id" :value="client.id">
                    {{ client.name }} - {{ client.meter_number }}
                  </option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Previous Reading -->
            <div>
              <label for="previous_reading" class="block text-sm font-medium text-gray-700 mb-1">Previous Reading</label>
              <input
                type="number"
                id="previous_reading"
                v-model="previousReading"
                readonly
                class="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>

            <!-- Current Reading -->
            <div>
              <label for="current_reading" class="block text-sm font-medium text-gray-700 mb-1">Current Reading</label>
              <input
                type="number"
                id="current_reading"
                v-model.number="currentReading"
                placeholder="Enter current reading"
                class="w-full p-3 border border-gray-300 rounded-lg transition duration-150"
              />
            </div>

            <!-- Rate per Unit -->
            <div>
              <label for="rate_per_unit" class="block text-sm font-medium text-gray-700 mb-1">Rate per Unit (Ksh)</label>
              <input
                type="number"
                id="rate_per_unit"
                v-model.number="ratePerUnit"
                readonly
                class="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>

            <!-- Calculate Bill -->
            <button
              type="submit"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition duration-150 ease-in-out mt-6"
            >
              Calculate Bill
            </button>
          </form>
        </div>

        <!-- Billing Receipt -->
        <div class="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-gray-800">Billing Receipt</h2>
            <button @click="printReceipt"
              class="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m0 0v2a2 2 0 002 2h6a2 2 0 002-2v-2M9 14h6m-3 6v-3m-3-3h.01M17 11V3H7v8h10z" />
              </svg>
              <span>Print</span>
            </button>
          </div>

          <div class="space-y-4 text-gray-700 mb-8" v-if="bill">
            <div class="flex justify-between"><span class="font-medium">Client Name:</span><span>{{ bill.client_name }}</span></div>
            <div class="flex justify-between"><span class="font-medium">Meter Number:</span><span>{{ bill.meter_number }}</span></div>
            <div class="flex justify-between"><span class="font-medium">Date:</span><span>{{ new Date().toLocaleDateString() }}</span></div>
            <hr class="border-gray-200 my-4">
            <div class="flex justify-between"><span class="font-medium">Previous Reading:</span><span>{{ bill.previous_reading }}</span></div>
            <div class="flex justify-between"><span class="font-medium">Current Reading:</span><span>{{ bill.current_reading }}</span></div>
            <div class="flex justify-between"><span class="font-medium">Units Used:</span><span>{{ bill.units_consumed }}</span></div>
            <div class="flex justify-between"><span class="font-medium">Rate per Unit:</span><span>Ksh{{ bill.rate_per_unit }}</span></div>
          </div>

          <div v-if="bill" class="flex justify-between items-center text-lg font-bold text-gray-800 mb-8">
            <span>Total Bill:</span>
            <span class="text-blue-600">Ksh{{ bill.total_amount }}</span>
          </div>

          <button
            v-if="bill"
            @click="saveReading"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition duration-150 ease-in-out"
          >
            Save Reading
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const router = useRouter()
const clients = ref([])
const selectedClientId = ref('')
const previousReading = ref(0)
const currentReading = ref(0)
const ratePerUnit = ref(120)
const bill = ref(null)

// ✅ Fetch all clients
async function fetchClients() {
  try {
    const baseURL = import.meta.env.VITE_API_URL 
    const res = await axios.get(`${baseURL}/api/clients/`)
    clients.value = res.data
  } catch (err) {
    console.error('Failed to load clients:', err)
  }
}

// Fetch previous reading for selected client
async function fetchPreviousReading() {
  if (!selectedClientId.value) return
  try {
    const baseURL = import.meta.env.VITE_API_URL
    const res = await axios.get(`${baseURL}/api/clients/${selectedClientId.value}/previous-reading/`)
    previousReading.value = res.data.previous_reading || 0
  } catch (error) {
    console.error('Failed to fetch previous reading:', error)
    previousReading.value = 0
  }
}


// Calculate bill
async function calculateBill() {
  if (!selectedClientId.value || !currentReading.value) {
    toast.error('Select client and enter current reading!');
    return;
  }

  try {
    const baseURL = import.meta.env.VITE_API_URL;

    const response = await axios.post(
      `${baseURL}/api/clients/${selectedClientId.value}/calculate-bill/`,
      {
        current_reading: Number(currentReading.value),
        rate_per_unit: 120,
      }
    );

    bill.value = response.data;

  } catch (err) {
    console.error('Failed to calculate bill:', err);
    toast.error('Failed to calculate bill!');
  }
}



async function saveReading() {
  if (!bill.value) return
  try {
    const baseURL = import.meta.env.VITE_API_URL
    const res = await axios.post(`${baseURL}/api/readings/`, {
      client: selectedClientId.value,
      current_reading: bill.value.current_reading,
    })
    toast.success('Reading saved successfully!')
    router.push('/history')
    console.log('Saved reading:', res.data)
  } catch (err) {
    console.error('Failed to save reading:', err.response?.data || err)
  }
}

// ✅ Print receipt
function printReceipt() {
  window.print()
}

// Auto load clients on mount
onMounted(fetchClients)
</script>
