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
                <th v-for="heading in tableHeaders" :key="heading" class="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ heading }}</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-100 text-sm">
              <tr
                v-for="(record, index) in filteredRecords"
                :key="index"
                class="hover:bg-gray-50 cursor-pointer"
              >
                <td class="py-3 whitespace-nowrap text-gray-600">{{ record.date }}</td>
                <td class="py-3 whitespace-nowrap font-medium text-gray-900">{{ record.client_name }}</td>
                <td class="py-3 whitespace-nowrap text-gray-600">{{ record.meter_number }}</td>
                <td class="py-3 whitespace-nowrap text-gray-600">{{ record.previous_reading }}</td>
                <td class="py-3 whitespace-nowrap text-gray-600">{{ record.current_reading }}</td>
                <td class="py-3 whitespace-nowrap text-gray-600 font-medium">{{ record.units_consumed }}</td>
                <td class="py-3 whitespace-nowrap text-gray-600">Sh {{ record.rate_per_unit }}</td>
                <td class="py-3 whitespace-nowrap text-blue-600 font-semibold">Sh {{ record.amount }}</td>
                <td
                  class="py-3 whitespace-nowrap text-gray-600 flex items-center space-x-2 cursor-pointer hover:text-blue-600"
                  @click="openReceipt(record)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                  </svg>
                  <span>{{ record.receipt_number }}</span>
                </td>
              </tr>

              <tr v-if="filteredRecords.length === 0">
                <td colspan="9" class="text-center py-6 text-gray-500">No records found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Receipt Popup Modal -->
    <div
      v-if="showReceipt"
      class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <div ref="receiptRef" class="bg-white w-[420px] p-6 rounded-lg shadow-2xl relative print:w-full print:shadow-none print:rounded-none print:p-4">
        <button
          @click="showReceipt = false"
          class="absolute top-2 right-2 text-gray-400 hover:text-gray-600 print:hidden"
        >
          ✕
        </button>

        <!-- Company Info -->
        <div class="text-center mb-4 border-b pb-3">
          <h1 class="text-2xl font-bold text-blue-700">Utility Billing Co.</h1>
          <p class="text-gray-500 text-sm">Reliable Energy. Transparent Billing.</p>
        </div>

        <h2 class="text-lg font-semibold text-gray-900 mb-2 text-center">
          RECEIPT
        </h2>
        <p class="text-center text-gray-500 text-sm mb-4">#{{ selectedRecord.receipt_number }}</p>

        <div class="space-y-2 text-sm text-gray-700">
          <p><strong>Date:</strong> {{ selectedRecord.date }}</p>
          <p><strong>Client Name:</strong> {{ selectedRecord.client_name }}</p>
          <p><strong>Meter Number:</strong> {{ selectedRecord.meter_number }}</p>
          <p><strong>Previous Reading:</strong> {{ selectedRecord.previous_reading }}</p>
          <p><strong>Current Reading:</strong> {{ selectedRecord.current_reading }}</p>
          <p><strong>Units Consumed:</strong> {{ selectedRecord.units_consumed }}</p>
          <p><strong>Rate per Unit:</strong> Sh {{ selectedRecord.rate_per_unit }}</p>

          <div class="border-t border-gray-200 my-3"></div>

          <p class="text-lg font-bold text-blue-700 text-right">
            Total: Sh {{ selectedRecord.amount }}
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
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const billingRecords = ref([]);
const searchQuery = ref("");
const showReceipt = ref(false);
const selectedRecord = ref({});
const receiptRef = ref(null);

const tableHeaders = [
  "Date", "Client", "Meter No.", "Previous", "Current",
  "Units", "Rate", "Total Bill", "Receipt No."
];

onMounted(async () => {
  try {
    const res = await axios.get("http://localhost:8000/api/readings/");
    billingRecords.value = res.data;
  } catch (error) {
    console.error("Error fetching billing records:", error);
  }
});

const filteredRecords = computed(() => {
  if (!searchQuery.value) return billingRecords.value;
  return billingRecords.value.filter((record) =>
    Object.values(record)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
  );
});

function openReceipt(record) {
  selectedRecord.value = record;
  showReceipt.value = true;
}

function printReceipt() {
  const printContent = receiptRef.value.innerHTML;
  const newWindow = window.open("", "", "width=600,height=800");
  newWindow.document.write(`
    <html>
      <head>
        <title>Receipt #${selectedRecord.value.receipt_number}</title>
        <style>
          body { font-family: 'Inter', sans-serif; padding: 20px; color: #333; }
          h1,h2 { text-align:center; color:#1E3A8A; }
          p { margin: 6px 0; font-size: 14px; }
          .total { font-weight: bold; color:#1E3A8A; text-align:right; }
          hr { margin: 10px 0; }
        </style>
      </head>
      <body>${printContent}</body>
    </html>
  `);
  newWindow.document.close();
  newWindow.print();
  newWindow.close();
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
  .print\\:hidden {
    display: none !important;
  }
}
</style>
