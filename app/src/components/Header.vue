<template>
  <header class="relative w-full text-sm bg-white shadow-sm">
    <nav class="text-black py-4">
      <div class="container mx-auto px-4 flex items-center justify-between relative">
        
        <!-- Logo -->
        <div class="flex items-center">
          <img
            class="h-8 mr-2"
            src="https://airhex.com/images/airline-logos/tailwind-airlines.png"
            alt="Your Logo"
            width="100"
          />
          <span class="font-semibold text-lg text-gray-800">Aqua Bill</span>
        </div>

        <!-- Centered Navbar Links (Desktop) -->
        <ul
          class="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2"
        >
          <li><router-link to="/" class="hover:text-blue-400 font-medium text-gray-700">Dashboard</router-link></li>
          <li><router-link to="/clients" class="hover:text-blue-400 font-medium text-gray-700">Clients</router-link></li>
          <li><router-link to="/readings" class="hover:text-blue-400 font-medium text-gray-700">Readings</router-link></li>
          <li><router-link to="/history" class="hover:text-blue-400 font-medium text-gray-700">History</router-link></li>
        </ul>

        <!-- Right side buttons + Hamburger -->
        <div class="flex items-center space-x-3">
          <a href="/signup" class="hidden sm:inline px-4 py-2 hover:bg-blue-400 border border-blue-400 text-black rounded-lg text-sm">
            Login
          </a>
          <a href="/login" class="hidden sm:inline px-4 py-2 bg-blue-400 text-white rounded-lg text-sm">
            Logout
          </a>

          <!-- Hamburger icon (Mobile only) -->
          <button @click="toggleMenu" class="md:hidden focus:outline-none">
            <svg
              v-if="!isMenuOpen"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-7 h-7"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>

            <!-- Close icon -->
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-7 h-7"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <transition name="slide-fade">
        <div
          v-if="isMenuOpen"
          class="md:hidden absolute top-16 left-0 w-full bg-white border-t border-gray-200 shadow-lg z-50"
        >
          <ul class="flex flex-col space-y-4 p-6 text-gray-700 font-medium">
            <li><router-link @click="closeMenu" to="/" class="block hover:text-blue-400">Dashboard</router-link></li>
            <li><router-link @click="closeMenu" to="/clients" class="block hover:text-blue-400">Clients</router-link></li>
            <li><router-link @click="closeMenu" to="/readings" class="block hover:text-blue-400">Readings</router-link></li>
            <li><router-link @click="closeMenu" to="/history" class="block hover:text-blue-400">History</router-link></li>

            <hr class="border-gray-200" />

            <a href="/login" class="block py-2 text-center border border-green-500 rounded-lg hover:bg-green-500 hover:text-white transition">
              Login
            </a>
            <a href="/logout" class="block py-2 text-center bg-black text-white rounded-lg hover:bg-gray-800 transition">
              Logout
            </a>
          </ul>
        </div>
      </transition>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
}
</script>

<style scoped>
/* Smooth transition for mobile menu */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
