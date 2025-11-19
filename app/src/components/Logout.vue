<template>
  <div class="max-w-sm mx-auto mt-10 p-6 bg-blue-900/80 rounded-2xl shadow-lg text-white text-center space-y-6">
    
    <!-- Header -->
    <h2 class="text-2xl font-bold text-indigo-400">💧 Aqua Bill</h2>

    <!-- Random water fact -->
    <p class="text-gray-200 italic">
      Did you know? {{ currentFact }}
    </p>

    <!-- Logout button -->
    <button
      @click="handleLogout"
      class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-md w-full"
    >
      Logout
    </button>

    <!-- Footer info -->
    <p class="text-gray-300 text-sm">
      Remember: every drop counts. Stay hydrated!
    </p>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { toast } from "vue3-toastify";

// Reactive state for login
const isLoggedIn = ref(true);

// List of water facts
const waterFacts = [
  "About 71% of the Earth's surface is water-covered.",
  "Water is the only substance that exists naturally in all three states: solid, liquid, and gas.",
  "An adult human body is about 60% water.",
  "Only 2.5% of the world's water is freshwater.",
  "Drinking enough water improves brain function and mood.",
  "Water can dissolve more substances than any other liquid."
];

// Current displayed fact
const currentFact = ref("");

// Pick a random fact on mount
onMounted(() => {
  const randomIndex = Math.floor(Math.random() * waterFacts.length);
  currentFact.value = waterFacts[randomIndex];
});

function handleLogout() {
  // Clear token and username from localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("username");

  isLoggedIn.value = false;

  // Show toast
  toast.info("You have logged out successfully");

  // Redirect to login page after short delay
  setTimeout(() => {
    window.location.href = "/login";
  }, 500);
}
</script>
