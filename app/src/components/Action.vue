<template>
  <section id="relume" class="relative px-[5%] py-16 md:py-24 lg:py-28">
    <div class="container relative z-10">
      <div class="grid grid-cols-1 items-start gap-5 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
        <div>
          <div class="rb-5 mb-5 md:mb-6">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/relume-icon-white.svg"
              class="size-12"
              alt="Relume logo"
            />
          </div>
          <h3 class="text-4xl font-semibold leading-[1.2] text-text-alternative md:text-5xl lg:text-6xl text-white">
            Get Your Travel Inspiration <br />
            Straight To Your Inbox
          </h3>

          <!-- Subscribe Form -->
          <form @submit.prevent="subscribe" class="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              class="px-4 py-2 rounded-md text-black w-full sm:w-auto"
              required
            />
            <button
              type="submit"
              class="bg-white text-black font-semibold px-6 py-2 rounded-md hover:bg-gray-200 transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        <p class="text-text-alternative md:text-md text-orange-500">
          There’s a whole planet waiting for you — from the snow-capped peaks of the Alps to the golden sands of the Sahara, from the buzzing streets of Tokyo to the peaceful villages of Tuscany. Every destination holds a story, a lesson, and a moment that could change your life.
        </p>
      </div>
    </div>

    <div class="absolute inset-0 z-0">
      <video
        class="absolute inset-0 aspect-video size-full object-cover"
        autoplay
        loop
        muted
      >
        <source src="https://videos.pexels.com/video-files/3620476/3620476-sd_640_360_25fps.mp4" type="video/mp4" />
      </video>
      <div class="absolute inset-0 bg-black/50"></div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')

function subscribe() {
  // You can send `email.value` to your API or newsletter service here
  alert(`Subscribed with: ${email.value}`)
  email.value = ''
}
</script>
