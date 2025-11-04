<template>
  <div class="text-gray-800 font-sans">
    <div ref="container" class="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
      <!-- Text Section -->
      <div ref="textSection">
        <h1 class="text-4xl md:text-5xl font-bold leading-tight">
          Discover the <br />
          World's <span class="text-orange-500 underline decoration-wavy underline-offset-4">Hidden</span> Wonders
        </h1>
        <p class="mt-4 text-gray-600">
          Find the unique moments and hidden gems that ignite unforgettable experiences.
          From rare encounters to remarkable destinations, we help you uncover the spark
          that turns every trip into a cherished story.
        </p>
        <button class="mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full shadow-md transition">
          Plan your trip
        </button>
      </div>

      <!-- Image Section -->
      <div ref="imageSection" class="relative flex justify-end items-center">
        <!-- Background Map -->
        <img src="https://img.freepik.com/premium-vector/map-world-white-background-geographical-banner_1113988-542.jpg"
             class="absolute opacity-50 mix-blend-multiply w-full h-full object-cover pointer-events-none" alt="World map"/>

        <div class="relative z-0 grid grid-cols-2 gap-4 h-full">
          <img ref="img1" src="https://img.freepik.com/free-photo/beautiful-collage-travel-concept_23-2149232171.jpg"
               class="rounded-xl h-72 object-cover" alt="Location 1" />
          <img ref="img2" src="https://img.freepik.com/free-photo/girl-jumping-with-excitement-doorway-with-sea_181624-20834.jpg"
               class="rounded-xl h-72 object-cover" alt="Location 2" />
          <img ref="img3" src="https://img.freepik.com/free-photo/view-castle-fortress_23-2150844377.jpg"
               class="rounded-xl h-72 object-cover col-span-2" alt="Location 3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const container = ref(null)
const textSection = ref(null)
const imageSection = ref(null)
const img1 = ref(null)
const img2 = ref(null)
const img3 = ref(null)

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 3 } })

  tl.from(textSection.value, {
    x: -100,
    opacity: 0
  })
  .from(imageSection.value, {
    x: 100,
    opacity: 0
  }, "-=0.8")
  .from([img1.value, img2.value, img3.value], {
    y: 50,
    opacity: 0,
    stagger: 1
  }, "-=0.8")
})
</script>

<style scoped>
/* Optional custom styles */
</style>
