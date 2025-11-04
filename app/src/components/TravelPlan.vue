<template>
  <section id="relume" class="relative px-4 py-12 md:py-24 lg:py-28 bg-orange-100">
    <div
      class="container grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:gap-x-20 lg:gap-y-16"
    >
      <h1 class="text-4xl font-bold text-center md:text-left md:text-7xl lg:text-5xl">
        Curated Travel Plans
      </h1>
      <div class="text-center md:text-left">
        <p class="text-base md:text-md">
          Discover the world with Wanderly's expertly crafted travel plans. Each itinerary is designed to inspire your wanderlust and simplify your journey.
        </p>
        <div class="mt-6 flex flex-col sm:flex-row sm:justify-center md:justify-start gap-4 md:mt-8">
          <router-link
            to="/learn-more"
            class="bg-orange-500 focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary bg-background-alternative text-text-alternative px-6 py-3"
            title="Learn More"
          >
            Learn More
          </router-link>
          <router-link
            to="/SignUp"
            class="hover:bg-black hover:text-white focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary text-text-primary bg-background-primary px-6 py-3"
            title="Sign Up"
          >
            Sign Up
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>
