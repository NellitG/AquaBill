<template>
  <div class="w-full">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

// Register components
Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

// ---- Props ----
const props = defineProps({
  labels: {
    type: Array,
    required: true
  },
  values: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: "Line Chart"
  },
  color: {
    type: String,
    default: "rgba(75, 192, 192, 1)"
  }
});

const canvas = ref(null);
let chartInstance = null;

// ---- Create Chart ----
const renderChart = () => {
  if (!canvas.value) return;

  // Destroy previous chart to avoid memory leaks
  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(canvas.value, {
    type: "line",
    data: {
      labels: props.labels,
      datasets: [
        {
          label: props.title,
          data: props.values,
          borderColor: props.color,
          backgroundColor: props.color.replace("1)", "0.2)"),
          tension: 0.3,
          borderWidth: 2,
          pointRadius: 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: "index"
      },
      scales: {
        x: {
          ticks: { color: "#555" }
        },
        y: {
          ticks: { color: "#555" }
        }
      }
    }
  });
};

// ---- Watch for Data Updates ----
watch(() => [props.labels, props.values], renderChart, { deep: true });

// ---- Mount / Unmount Hooks ----
onMounted(renderChart);

onBeforeUnmount(() => {
  if (chartInstance) chartInstance.destroy();
});
</script>

<style scoped>
div {
  height: 300px;
}
</style>
