<template>
  <div class="bg-gray-50 min-h-screen p-3 sm:p-6 md:p-8">
    <div class="max-w-7xl mx-auto">

      <!-- Header -->
      <header class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <div class="text-center sm:text-left">
          <h1 class="text-5xl sm:text-3xl font-semibold text-gray-950">Client Management</h1>
          <p class="text-gray-500 mt-1 text-sm sm:text-base">Manage your water utility clients</p>
        </div>
      </header>

      <!-- Register/Edit Form -->
      <div class="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 mb-8">
        <h2 class="text-lg sm:text-xl font-semibold text-gray-800">
          {{ editingClient ? 'Edit Client' : 'Register New Client' }}
        </h2>
        <p class="text-gray-500 mt-1 mb-5 text-sm sm:text-base">
          {{ editingClient ? 'Update client information below' : 'Enter client information below' }}
        </p>

        <form @submit.prevent="editingClient ? updateClient() : addClient()" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input v-model="form.name" type="text" placeholder="Enter full name"
              class="w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input v-model="form.phone" type="tel" placeholder="Enter phone number"
              class="w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Meter Number</label>
            <input v-model="form.meter_number" type="text" placeholder="Enter meter number"
              class="w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150">
          </div>

          <div class="col-span-1 sm:col-span-2 lg:col-span-3 mt-4 flex flex-col sm:flex-row gap-3">
            <button type="submit"
              class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 sm:px-6 rounded-lg shadow-md transition duration-150 text-sm sm:text-base">
              {{ editingClient ? 'Save Changes' : 'Add Client' }}
            </button>
            <button type="button" @click="resetForm"
              class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2.5 px-4 sm:px-6 rounded-lg transition duration-150 text-sm sm:text-base">
              Cancel
            </button>
          </div>
        </form>
      </div>

      <!-- Client List -->
      <div class="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <h2 class="text-base sm:text-lg font-semibold mb-4">Registered Clients</h2>

        <div v-if="loading" class="text-gray-500 text-center py-6 text-sm sm:text-base">Loading clients...</div>
        <div v-else-if="error" class="text-red-500 text-center py-6 text-sm sm:text-base">{{ error }}</div>

        <div v-else class="overflow-x-auto -mx-4 sm:mx-0">
          <table class="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
            <thead class="bg-gray-50">
              <tr>
                <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meter Number</th>
                <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th class="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="client in paginatedClients" :key="client.id" class="hover:bg-gray-50">
                <td class="py-3 px-4 font-medium text-gray-900">{{ client.name }}</td>
                <td class="py-3 px-4 text-gray-600">{{ client.phone }}</td>
                <td class="py-3 px-4 text-gray-600">{{ client.meter_number }}</td>
                <td class="py-3 px-4 text-gray-600">{{ formatDate(client.created_at) }}</td>
                <td class="py-3 px-4 text-right space-x-2">
                  <button @click="startEdit(client)"
                    class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm">
                    Edit
                  </button>
                  <button @click="deleteClient(client.id)"
                    class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Pagination Controls -->
          <div class="flex justify-center items-center mt-4 space-x-3">
            <button @click="prevPage" :disabled="currentPage === 1"
              class="px-3 py-2 bg-gray-200 text-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300">
              ← Previous
            </button>
            <span class="text-sm text-gray-700">Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages"
              class="px-3 py-2 bg-gray-200 text-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300">
              Next →
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { toast } from "vue3-toastify"

const clients = ref([])
const loading = ref(false)
const error = ref(null)

const editingClient = ref(null)
const form = ref({
  name: '',
  phone: '',
  meter_number: ''
})

// Pagination
const currentPage = ref(1)
const itemsPerPage = 5

const baseURL = import.meta.env.VITE_API_URL

// ✅ Fetch clients
async function fetchClients() {
  try {
    loading.value = true
    const response = await axios.get(`${baseURL}/api/clients/`)
    clients.value = response.data
  } catch (err) {
    console.error(err)
    error.value = 'Failed to load clients'
  } finally {
    loading.value = false
  }
}

// ✅ Pagination logic
const totalPages = computed(() => Math.ceil(clients.value.length / itemsPerPage))
const paginatedClients = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return clients.value.slice(start, end)
})

function nextPage() { if (currentPage.value < totalPages.value) currentPage.value++ }
function prevPage() { if (currentPage.value > 1) currentPage.value-- }

// ✅ Add new client
async function addClient() {
  if (!form.value.name || !form.value.phone || !form.value.meter_number) {
    toast.error("All fields are required!")
    return
  }
  try {
    const res = await axios.post(`${baseURL}/api/clients/`, form.value)
    clients.value.push(res.data)
    resetForm()
    toast.success("Client added successfully!")
    currentPage.value = totalPages.value
  } catch (err) {
    console.error(err)
    toast.error("Failed to add client")
  }
}

// ✅ Start editing
function startEdit(client) {
  editingClient.value = client.id
  form.value = { ...client }
}

// ✅ Update client
async function updateClient() {
  if (!form.value.name || !form.value.phone || !form.value.meter_number) {
    toast.error("All fields are required!")
    return
  }
  try {
    await axios.put(`${baseURL}/api/clients/${editingClient.value}/`, form.value)
    const index = clients.value.findIndex(c => c.id === editingClient.value)
    if (index !== -1) clients.value[index] = { ...form.value, id: editingClient.value }
    editingClient.value = null
    resetForm()
    toast.success("Client updated successfully!")
  } catch (err) {
    console.error(err)
    toast.error("Failed to update client")
  }
}

// ✅ Delete client
async function deleteClient(id) {
  if (!confirm("Are you sure you want to delete this client?")) return
  try {
    await axios.delete(`${baseURL}/api/clients/${id}/`)
    clients.value = clients.value.filter(c => c.id !== id)
    toast.success("Client deleted successfully!")
  } catch (err) {
    console.error(err)
    toast.error("Failed to delete client")
  }
}

// ✅ Reset form
function resetForm() {
  editingClient.value = null
  form.value = { name: '', phone: '', meter_number: '' }
}

// ✅ Format date
function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return isNaN(date) ? '' : date.toLocaleDateString()
}

// ✅ Fetch clients on mount
onMounted(fetchClients)
</script>
