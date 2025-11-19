<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4">
    <div class="w-full max-w-sm bg-gray-800 rounded-2xl p-8 shadow-lg">

      <h2 class="text-3xl font-bold text-indigo-400 mb-6 text-center">💧 Aqua Bill</h2>

      <p v-if="!isLoggedIn" class="text-gray-400 mb-6 text-center">
        Sign in to manage your account.
      </p>
      <p v-else class="text-green-400 mb-6 text-center">
        Login successful! Welcome, {{ displayName }}.
      </p>

      <!-- Only show form if not logged in -->
      <form v-if="!isLoggedIn" @submit.prevent="handleLogin" class="space-y-4">

        <div>
          <label class="block text-sm font-semibold mb-1 text-indigo-300">Username</label>
          <input
            v-model="username"
            type="text"
            placeholder="Enter your username"
            class="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-semibold mb-1 text-indigo-300">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors"
        >
          Sign In Securely
        </button>

      </form>

      <p class="mt-6 text-center text-gray-400 text-sm">
        Don't have an account?
        <a href="#" class="text-indigo-400 hover:text-indigo-300 font-medium">Create an account</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";

// reactive state
const username = ref("");
const password = ref("");
const isLoggedIn = ref(false);
const displayName = ref("");

// check if user already logged in on mount
onMounted(() => {
  const token = localStorage.getItem("token");
  const savedUser = localStorage.getItem("username");
  if (token && savedUser) {
    isLoggedIn.value = true;
    displayName.value = savedUser;
    
  }
});

async function handleLogin() {
  try {
    const baseURL = import.meta.env.VITE_API_URL;

    const response = await axios.post(`${baseURL}/api/login/`, {
      username: username.value,
      password: password.value
    });

    // Save token and username in localStorage
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("username", username.value);

    // Set reactive state
    isLoggedIn.value = true;
    displayName.value = username.value;

    // Show toast
    toast.success(`Login successful! Welcome, ${username.value}`);

    // Delay redirect slightly so user sees message
    setTimeout(() => {
      window.location.href = "/clients";
    }, 1000); // 1 second delay

  } catch (error) {
    console.error("Login failed:", error.response?.data || error);
    toast.error("Failed to login: Invalid credentials");
  }
}
</script>
