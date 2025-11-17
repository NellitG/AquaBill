<template>
  <div class="bg-gray-50 min-h-screen p-4 sm:p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Billing History</h1>
        <p class="text-gray-500 mt-1">View all historical meter readings and billing</p>
      </header>

      <!-- Billing Table Card -->
      <div class="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100">
        <h2 class="text-xl font-semibold text-gray-800 mb-6">All Readings</h2>

        <!-- Search Bar -->
        <div class="mb-6 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by client name, meter number, or receipt..."
            class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg custom-focus-ring transition duration-150"
          />
        </div>

        <!-- Billing Data Table -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th v-for="heading in tableHeaders" :key="heading" class="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{ heading }}
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-100 text-sm">
              <tr
                v-for="(record, index) in paginatedRecords"
                :key="record.id ?? index"
                class="hover:bg-gray-50 cursor-pointer"
              >
                <td class="py-3 whitespace-nowrap text-gray-600">{{ formatDate(record.date) }}</td>
                <td class="py-3 whitespace-nowrap font-medium text-gray-900">{{ record.client_name ?? '—' }}</td>
                <td class="py-3 whitespace-nowrap text-gray-600">{{ record.meter_number ?? '—' }}</td>
                <td class="py-3 whitespace-nowrap text-gray-600">{{ formatNumber(record.previous_reading) }}</td>
                <td class="py-3 whitespace-nowrap text-gray-600">{{ formatNumber(record.current_reading) }}</td>
                <td class="py-3 whitespace-nowrap text-gray-600 font-medium">{{ formatNumber(record.units_consumed) }}</td>
                <td class="py-3 whitespace-nowrap text-gray-600">Sh {{ formatNumber(record.rate_per_unit) }}</td>
                <td class="py-3 whitespace-nowrap text-blue-600 font-semibold">Sh {{ formatNumber(record.amount) }}</td>
                <td
                  class="py-3 whitespace-nowrap text-gray-600 flex items-center space-x-2 cursor-pointer hover:text-blue-600"
                >
                  <button @click="openReceipt(record)" class="flex items-center space-x-2 text-left">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2"/>
                    </svg>
                    <span>{{ record.receipt_number ?? '—' }}</span>
                  </button>
                </td>
              </tr>

              <tr v-if="paginatedRecords.length === 0">
                <td colspan="9" class="text-center py-6 text-gray-500">No records found.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination Controls -->
        <div class="flex justify-center items-center mt-6 space-x-3">
          <button
            @click="prevPage"
            :disabled="currentPage <= 1"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
          >
            ← Previous
          </button>

          <span class="text-sm text-gray-600">
            Page {{ currentPage }} of {{ Math.max(totalPages, 1) }}
          </span>

          <button
            @click="nextPage"
            :disabled="currentPage >= totalPages || totalPages === 0"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
          >
            Next →
          </button>
        </div>
      </div>
    </div>

    <!-- Receipt Popup Modal -->
    <div
      v-if="showReceipt"
      class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <div ref="receiptRef" class="bg-white w-[420px] max-w-full p-6 rounded-lg shadow-2xl relative print:w-full print:shadow-none print:rounded-none print:p-4">
        <button
          @click="closeReceipt"
          class="absolute top-2 right-2 text-gray-400 hover:text-gray-600 print:hidden"
        >
          ✕
        </button>

        <!-- Company Info -->
        <div class="text-center mb-4 border-b pb-3">
          <h1 class="text-2xl font-bold text-blue-700">Utility Billing Co.</h1>
          <p class="text-gray-500 text-sm">Reliable Water. Transparent Billing.</p>
        </div>

        <h2 class="text-lg font-semibold text-gray-900 mb-2 text-center">RECEIPT</h2>
        <p class="text-center text-gray-500 text-sm mb-4">#{{ selectedRecord.receipt_number ?? '—' }}</p>

        <div class="space-y-2 text-sm text-gray-700">
          <p><strong>Date:</strong> {{ formatDate(selectedRecord.date) }}</p>
          <p><strong>Client Name:</strong> {{ selectedRecord.client_name ?? '—' }}</p>
          <p><strong>Meter Number:</strong> {{ selectedRecord.meter_number ?? '—' }}</p>
          <p><strong>Previous Reading:</strong> {{ formatNumber(selectedRecord.previous_reading) }}</p>
          <p><strong>Current Reading:</strong> {{ formatNumber(selectedRecord.current_reading) }}</p>
          <p><strong>Units Consumed:</strong> {{ formatNumber(selectedRecord.units_consumed) }}</p>
          <p><strong>Rate per Unit:</strong> Sh {{ formatNumber(selectedRecord.rate_per_unit) }}</p>

          <div class="border-t border-gray-200 my-3"></div>

          <p class="text-lg font-bold text-blue-700 text-right">
            Total: Sh {{ formatNumber(selectedRecord.amount) }}
          </p>
        </div>

        <div class="mt-6 text-center print:hidden">
          <button
            @click="printReceipt"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import axios from "axios";

const billingRecords = ref([]);
const searchQuery = ref("");
const showReceipt = ref(false);
const selectedRecord = ref({});
const receiptRef = ref(null);

// Pagination
const currentPage = ref(1);
const itemsPerPage = 5;

// Column headers
const tableHeaders = [
  "Date", "Client", "Meter No.", "Previous", "Current",
  "Units", "Rate", "Total Bill", "Receipt No."
];

// --- Fetch data (defensive) ---
async function fetchRecords() {
  try {
    const baseURL = import.meta.env.VITE_API_BASE_URL 
    const res = await axios.get(`${baseURL}/api/readings/`); 
    // Ensure array
    billingRecords.value = Array.isArray(res.data) ? res.data : (res.data.results ?? []);
  } catch (err) {
    console.error("Error fetching billing records:", err);
    billingRecords.value = [];
  }
}
onMounted(fetchRecords);

// --- Filtering (search) ---
const filteredRecords = computed(() => {
  const q = (searchQuery.value || "").trim().toLowerCase();
  if (!q) return billingRecords.value;
  return billingRecords.value.filter((r) =>
    Object.values(r || {})
      .map(v => v === null ? "" : String(v))
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
});

// Reset to first page when search or data changes
watch([searchQuery, billingRecords], () => {
  currentPage.value = 1;
});

// --- Pagination computed ---
const totalPages = computed(() => Math.ceil(filteredRecords.value.length / itemsPerPage));
const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredRecords.value.slice(start, start + itemsPerPage);
});

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}

</script>

<style>
body {
  font-family: "Inter", sans-serif;
}
.custom-focus-ring:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
  outline: none;
}

/* Print-specific styling */
@media print {
  .print\:hidden {
    display: none !important;
  }
}
</style>
