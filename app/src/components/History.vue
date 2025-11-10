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
    const res = await axios.get(`${baseURL}/readings/`); 
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

// --- Receipt handling ---
function openReceipt(record) {
  selectedRecord.value = {
    id: record.id,
    receipt_number: record.receipt_number ?? null,
    date: record.date ?? null,
    client_name: record.client_name ?? (record.client_name === undefined ? record.client?.name : ''),
    meter_number: record.meter_number ?? (record.client?.meter_number ?? null),
    previous_reading: record.previous_reading ?? record.previous ?? 0,
    current_reading: record.current_reading ?? record.current ?? 0,
    units_consumed: record.units_consumed ?? record.units_used ?? 0,
    rate_per_unit: record.rate_per_unit ?? record.rate ?? 0,
    amount: record.amount ?? record.total_amount ?? 0,
  };
  showReceipt.value = true;
}

function closeReceipt() {
  showReceipt.value = false;
  selectedRecord.value = {};
}

// --- Safe printing ---
function printReceipt() {
  
  const contentEl = receiptRef.value;
  let printHtml = "";
  if (contentEl) {
    printHtml = contentEl.innerHTML;
  } else {
   
    printHtml = `
      <div>
        <h2>Receipt</h2>
        <p>Receipt #: ${selectedRecord.value.receipt_number ?? "—"}</p>
      </div>`;
  }

  const w = window.open("", "", "width=700,height=900");
  if (!w) {
    alert("Unable to open print window. Please allow popups for this site.");
    return;
  }

  w.document.write(`
    <html>
      <head>
        <title>Receipt ${selectedRecord.value.receipt_number ?? ""}</title>
        <style>
          body { font-family: Inter, Arial, sans-serif; padding: 20px; color: #333; }
          h1, h2 { color: #1E3A8A; text-align:center; }
          p { margin: 6px 0; font-size: 14px; }
          .total { font-weight: 700; color: #1E3A8A; text-align:right; font-size: 16px; }
        </style>
      </head>
      <body>${printHtml}</body>
    </html>
  `);
  w.document.close();

  setTimeout(() => {
    w.print();
    
    try { w.close(); } catch (e) { /* ignore */ }
  }, 250);
}

// --- Helpers ---
function formatDate(d) {
  if (!d) return "—";
  const dt = new Date(d);
  if (isNaN(dt)) return String(d).slice(0, 19);
  return dt.toLocaleDateString();
}
function formatNumber(v) {
  if (v === null || v === undefined || v === "") return "—";
  const n = Number(v);
  return isNaN(n) ? String(v) : n % 1 === 0 ? String(n) : n.toFixed(2);
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
