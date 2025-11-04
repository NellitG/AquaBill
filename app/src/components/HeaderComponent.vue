<template>
  <div
    class="px-12 sm:px-6 hidden lg:flex justify-between lg:items-center lg:py-8 bg-slate-950 border-b border-orange-500"
  >
    <router-link class="text-white text-xl" to="/"> JK </router-link>

    <ul class="space-x-16 lg:flex mr-20">
      <li>
        <router-link to="/" class="text-white hover:text-text_color"
          >HOME</router-link
        >
      </li>
      <li>
        <router-link
          to="/about"
          @click="toggleMobileSidebar"
          class="text-white hover:text-text_color"
          >ABOUT</router-link
        >
      </li>
      <li>
        <router-link
          to="/service"
          @click="toggleMobileSidebar"
          class="text-white hover:text-text_color"
        >
          SERVICES
        </router-link>
      </li>
      <li>
        <router-link
          to="/contact"
          @click="toggleMobileSidebar"
          class="text-white hover:text-text_color"
          >CONTACT US</router-link
        >
      </li>
    </ul>
  </div>
  <!-- mobile sidebar  -->
  <div
    class="lg:hidden fixed w-full h-20 z-[100] shadow-xl transition-transform ease-in-out duration-300 bg-slate-950"
  >
    <div class="max-w-7xl lg:px-8 py-4">
      <div class="flex items-center justify-between">
        <router-link to="/">
          <span class="text-white text-xl ml-4"> JK</span>
        </router-link>
        <button
          @click="toggleMobileSidebar"
          class="text-white mr-2 text-2xl lg:hidden"
        >
          ☰
        </button>
      </div>
      <div name="slide " class="w-9/12 ml-auto left-0">
        <div
          v-if="mobileSidebarOpen"
          class="bg-black text-white mt-4 p-4 rounded-lg opacity-80 h-screen"
        >
          <div class="text-end mt-4 text-2xl">
            <button @click="toggleMobileSidebar" class="text-white">X</button>
          </div>
          <ul class="space-y-12 text-xl ml-4 text-orange-500">
            <li>
              <router-link to="/" @click="toggleMobileSidebar">
                Home</router-link
              >
            </li>
            <li>
              <router-link to="/about" @click="toggleMobileSidebar">
                About</router-link
              >
            </li>
            <li>
              <router-link to="/service" @click="toggleMobileSidebar">
                Services</router-link
              >
            </li>
            <li>
              <router-link to="/contact" @click="toggleMobileSidebar">
                ContactUs</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const mobileSidebarOpen = ref(false);

const toggleMobileSidebar = () => {
  mobileSidebarOpen.value = !mobileSidebarOpen.value;
};
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
