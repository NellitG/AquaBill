<template>
  <div class="bg-gray-50 min-h-screen p-4 sm:p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Meter Readings</h1>
        <p class="text-gray-500 mt-1">Record and calculate monthly readings</p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- LEFT: ENTER READING -->
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

          <!-- FORM -->
          <form @submit.prevent="calculateBill" class="space-y-6">
            <!-- Select Client -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Select Client</label>
              <select
                v-model="selectedClientId"
                @change="handleClientChange"
                class="block w-full p-3 border border-gray-300 rounded-lg bg-white cursor-pointer"
              >
                <option disabled value="">-- Select a client --</option>
                <option v-for="client in clients" :key="client.id" :value="client.id">
                  {{ client.name }} - {{ client.meter_number }}
                </option>
              </select>
            </div>

            <!-- Previous Reading -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Previous Reading</label>
              <input type="number" v-model="previousReading" readonly class="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
            </div>

            <!-- Current Reading -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Current Reading</label>
              <input
                type="number"
                v-model.number="currentReading"
                placeholder="Enter current reading"
                class="w-full p-3 border border-gray-300 rounded-lg"
              >
            </div>

            <!-- Rate -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Rate per Unit (Ksh)</label>
              <input type="number" v-model="ratePerUnit" readonly class="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
            </div>

            <button
              type="submit"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-md"
            >
              Calculate Bill
            </button>
          </form>
        </div>

        <!-- RIGHT: BILL RECEIPT -->
        <div class="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-gray-800">Billing Receipt</h2>

            <button
              @click="printReceipt"
              class="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m0 0v2a2 2 0 002 2h6a2 2 0 002-2v-2M9 14h6m-3 6v-3m-3-3h.01M17 11V3H7v8h10z" />
              </svg>
              <span>Print</span>
            </button>
          </div>

          <div v-if="bill" class="space-y-4 text-gray-700 mb-8">
            <div class="flex justify-between"><span class="font-medium">Client Name:</span><span>{{ bill.client_name }}</span></div>
            <div class="flex justify-between"><span class="font-medium">Meter Number:</span><span>{{ bill.meter_number }}</span></div>
            <div class="flex justify-between"><span class="font-medium">Date:</span><span>{{ new Date().toLocaleDateString() }}</span></div>

            <hr class="border-gray-200 my-4">

            <div class="flex justify-between"><span class="font-medium">Previous Reading:</span><span>{{ bill.previous_reading }}</span></div>
            <div class="flex justify-between"><span class="font-medium">Current Reading:</span><span>{{ bill.current_reading }}</span></div>
            <div class="flex justify-between"><span class="font-medium">Units Used:</span><span>{{ bill.units_consumed }}</span></div>
            <div class="flex justify-between"><span class="font-medium">Rate per Unit:</span><span>Ksh {{ bill.rate_per_unit }}</span></div>
          </div>

          <div v-if="bill" class="flex justify-between items-center text-lg font-bold text-gray-800 mb-8">
            <span>Total Bill:</span>
            <span class="text-blue-600">Ksh {{ bill.amount }}</span>
          </div>

          <button
            v-if="bill"
            @click="saveReading"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-md"
          >
            Save Reading
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import axios from "axios"
import { toast } from "vue3-toastify"

const router = useRouter()

const clients = ref([])
const selectedClientId = ref('')
const selectedClient = ref(null)
const previousReading = ref(0)
const currentReading = ref(0)
const ratePerUnit = ref(120)
const bill = ref(null)


  //  FETCH CLIENTS

async function fetchClients() {
  try {
    const baseURL = import.meta.env.VITE_API_URL
    const res = await axios.get(`${baseURL}/api/clients/`)
    clients.value = res.data
  } catch (err) {
    console.error("Failed to load clients:", err)
    toast.error("Failed to load clients")
  }
}


  //  WHEN USER SELECTS A CLIENT

async function handleClientChange() {
  selectedClient.value = clients.value.find(c => c.id === selectedClientId.value)

  if (!selectedClient.value) return

  try {
    const baseURL = import.meta.env.VITE_API_URL
    const res = await axios.get(`${baseURL}/api/clients/${selectedClientId.value}/previous-reading/`)
    previousReading.value = res.data.previous_reading || 0
  } catch (err) {
    previousReading.value = 0
  }
}

  //  CALCULATE BILL

async function calculateBill() {
  if (!selectedClientId.value || !currentReading.value) {
    toast.error("Select client and enter current reading!")
    return
  }

  try {
    const baseURL = import.meta.env.VITE_API_URL
    const res = await axios.post(
      `${baseURL}/api/clients/${selectedClientId.value}/calculate-bill/`,
      {
        current_reading: Number(currentReading.value),
        rate_per_unit: ratePerUnit.value
      }
    )

    bill.value = {
      ...res.data,
      client_name: selectedClient.value.name,
      meter_number: selectedClient.value.meter_number
    }

  } catch (err) {
    console.error("Failed to calculate bill:", err)
    toast.error("Failed to calculate bill")
  }
}

  //  SAVE READING

async function saveReading() {
  if (!bill.value) return

  try {
    const baseURL = import.meta.env.VITE_API_URL
    await axios.post(`${baseURL}/api/readings/`, {
      client: selectedClientId.value,
      current_reading: bill.value.current_reading,
      rate_per_unit: bill.value.rate_per_unit
    })

    toast.success("Reading saved successfully!")
    router.push("/history")

  } catch (err) {
    console.error("Save failed:", err)
    toast.error("Failed to save reading")
  }
}


  //  PRINT RECEIPT

function printReceipt() {
  window.print()
}

onMounted(fetchClients)
</script>
