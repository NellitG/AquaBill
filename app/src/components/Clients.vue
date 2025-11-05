<template>
  <div class="bg-gray-50 min-h-screen p-4 sm:p-8">
    <div class="max-w-7xl mx-auto">

      <!-- Header -->
      <header class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Client Management</h1>
          <p class="text-gray-500 mt-1">Manage your water utility clients</p>
        </div>
      </header>

      <!-- Register Form -->
      <div class="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 mb-8">
        <h2 class="text-xl font-semibold text-gray-800">Register New Client</h2>
        <p class="text-gray-500 mt-1 mb-6">Enter client information below</p>
        
        <form @submit.prevent="addClient" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input v-model="newClient.name" type="text" placeholder="Enter full name"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input v-model="newClient.phone" type="tel" placeholder="Enter phone number"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Meter Number</label>
            <input v-model="newClient.meter_number" type="text" placeholder="Enter meter number"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150">
          </div>

          <div class="col-span-3 mt-4 flex gap-3">
            <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg shadow-md transition duration-150">
              Add Client
            </button>
            <button type="button" @click="resetForm"
              class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2.5 px-6 rounded-lg transition duration-150">
              Cancel
            </button>
          </div>
        </form>
      </div>

      <!-- Client List -->
      <div class="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100">
        <h2 class="text-lg font-semibold mb-4">Registered Clients</h2>

        <div v-if="loading" class="text-gray-500 text-center py-6">Loading clients...</div>
        <div v-else-if="error" class="text-red-500 text-center py-6">{{ error }}</div>

        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th class="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th class="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meter Number</th>
                <th class="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-sm">
              <tr v-for="client in clients" :key="client.id" class="hover:bg-gray-50">
                <td class="py-3 font-medium text-gray-900">{{ client.name }}</td>
                <td class="py-3 text-gray-600">{{ client.phone }}</td>
                <td class="py-3 text-gray-600">{{ client.meter_number }}</td>
                <td class="py-3 text-gray-600">
                  {{ formatDate(client.created_at) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const clients = ref([])
const loading = ref(false)
const error = ref(null)

const newClient = ref({
  name: '',
  phone: '',
  meter_number: ''
})

// ✅ Fetch clients from API
async function fetchClients() {
  try {
    loading.value = true
    const response = await axios.get('http://localhost:8000/api/clients/')
    clients.value = response.data
  } catch (err) {
    console.error('Fetch clients failed:', err)
    error.value = 'Failed to load clients'
  } finally {
    loading.value = false
  }
}

// ✅ Add new client
async function addClient() {
  if (!newClient.value.name || !newClient.value.phone || !newClient.value.meter_number) {
    alert('All fields are required!')
    return
  }

  try {
    const response = await axios.post('http://localhost:8000/api/clients/', newClient.value)
    clients.value.push(response.data)
    console.log('Client added Successfully:', response.data)
    resetForm()
  } catch (err) {
    if (err.response) {
      console.error("Add client failed:", err.response.data)
      alert(`Error: ${JSON.stringify(err.response.data)}`)
    } else {
      console.error("Add client failed:", err)
      alert("An error occurred while adding the client.")
    }
  }
}

// ✅ Reset form
function resetForm() {
  newClient.value = { name: '', phone: '', meter_number: '' }
}

// ✅ Format date safely
function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return isNaN(date) ? '' : date.toLocaleDateString()
}

// ✅ Auto fetch on mount
onMounted(fetchClients)
</script>
