<template>
  <div class="bg-slate-950 text-white min-h-screen">
    <div class="container mx-auto px-4 py-12">
      <h2 class="text-4xl font-bold text-center mb-8 text-orange-500">
        Services
      </h2>
      <p class="mb-12 text-center">
        Below are some core services I offer to improve and create engaging web
        applications.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Service Card 1 -->
        <div class="bg-orange-500 p-6 rounded-lg shadow-lg">
          <div class="mb-4">
            <img
              src="https://cdn.pixabay.com/photo/2015/05/29/10/33/ux-789162_640.jpg"
              alt="Responsive Design"
              class="h-16 w-16 rounded-lg"
            />
          </div>
          <h3 class="text-lg font-semibold mb-3">Responsive Design</h3>
          <p class="text-sm mb-3">
            Creating designs that work on desktops, tablets, and mobiles with a
            focus on optimal usability and the best user experience.
          </p>
          <a href="#" class="text-blue-300 hover:underline"
            >Read more &raquo;</a
          >
        </div>

        <!-- Service Card 2 -->
        <div class="bg-orange-500 p-6 rounded-lg shadow-lg">
          <div class="mb-4">
            <img
              src="https://cdn.pixabay.com/photo/2012/11/06/03/57/magnifying-glass-64267_1280.jpg"
              alt="Performance Optimization"
              class="h-16 w-16 rounded-lg"
            />
          </div>
          <h3 class="text-lg font-semibold mb-3">Performance Optimization</h3>
          <p class="text-sm mb-3">
            Enhancing page speed with best practices in web performance,
            including compression, minification, and caching strategies.
          </p>
          <a href="#" class="text-blue-300 hover:underline"
            >Read more &raquo;</a
          >
        </div>

        <!-- Service Card 3 -->
        <div class="bg-orange-500 p-6 rounded-lg shadow-lg">
          <div class="mb-4">
            <img
              src="https://cdn.pixabay.com/photo/2018/01/26/09/06/people-3108155_640.jpg"
              alt="SEO-Friendly Development"
              class="h-16 w-16"
            />
          </div>
          <h3 class="text-lg font-semibold mb-3">SEO-Friendly Development</h3>
          <p class="text-sm mb-3">
            Building web pages with best SEO practices in mind to improve
            visibility in search engine results.
          </p>
          <a href="#" class="text-blue-300 hover:underline"
            >Read more &raquo;</a
          >
        </div>

        <!-- Repeat for other services -->
      </div>

      <!-- Additional Info Section -->
      <div class="text-center mt-12">
        <h3 class="text-2xl font-bold mb-6 italic">
          <span class="text-black">I'm</span>&nbsp;
        <span v-for="(letter, index) in animatedText" :key="index">
          {{ letter }}
        </span>
         
        </h3>
        <!-- Icons and texts -->
        <div class="flex justify-center space-x-4">
          <!-- Icon 1 -->
          <div class="flex flex-col items-center">
            <img
              src="https://cdn.pixabay.com/photo/2018/02/23/04/38/computer-3174729_640.jpg"
              alt="Web Development"
              class="h-48 w-48 mb-2"
            />
            <p class="text-xs text-orange-500">Web Development</p>
          </div>
          <!-- Icon 2 -->
          <div class="flex flex-col items-center">
            <img
              src="https://cdn.pixabay.com/photo/2015/05/26/23/52/technology-785742_1280.jpg"
              alt="API Integration"
              class="h-48 w-48 mb-2"
            />
            <p class="text-xs text-orange-500">API Integration</p>
          </div>
          <!-- Icon 3 -->
          <div class="flex flex-col items-center">
            <img
              src="https://cdn.pixabay.com/photo/2015/03/11/02/12/ui-668043_640.jpg"
              alt="UX/UI Design"
              class="h-48 w-48 mb-2"
            />
            <p class="text-xs text-orange-500">UX/UI Design</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const animatedText = ref([]);
const textToAnimate = " I Offer a Wide Variety of Front-End Development Services";

onMounted(() => {
  animateText();
});

function animateText() {
  for (let i = 0; i < textToAnimate.length; i++) {
    setTimeout(() => {
      animatedText.value.push(textToAnimate[i]);
    }, i * 100); // Adjust the delay between each letter (milliseconds)
  }
}
</script>

<style>
/* Tailwind CSS does not need extra CSS by default, but you can add global styles if necessary */
</style>
