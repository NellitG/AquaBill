<template>
 <footer id="relume" class="px-[5%] py-12 md:py-18 lg:py-20">
    <div class="container">
      <div
        class="grid grid-cols-1 items-start justify-between gap-x-[8vw] gap-y-12 pb-12 sm:gap-y-10 md:gap-y-14 md:pb-18 lg:grid-cols-[1fr_0.5fr] lg:pb-20"
      >
        <div class="flex flex-col items-start">
          <a href="#" class="mb-8 h-8 w-32 md:mb-10 lg:mb-12 lg:w-40"
            ><img
              src="https://airhex.com/images/airline-logos/tailwind-airlines.png"
              alt="Logo image"
              class="inline-block"
          /></a>
          <ul
            class="grid grid-flow-row grid-cols-1 items-start justify-center justify-items-start gap-y-4 md:grid-flow-col md:grid-cols-[max-content] md:justify-start md:justify-items-start md:gap-x-6"
          >
            <li><router-link to="/" class="font-semibold">Destination</router-link></li>
            <li><router-link to="/travelplan" class="font-semibold">Travel Plan</router-link></li>
            <li><router-link to="/inspiration" class="font-semibold">Inspiration</router-link></li>
            <li><router-link to="/shop" class="font-semibold">Shop</router-link></li>
            <!-- <li class="font-semibold"><a href="#">Link Five</a></li> -->
          </ul>
        </div>
        <div class="max-w-md lg:min-w-[25rem]">
          <p class="mb-3 font-semibold md:mb-4">Subscribe</p>
          <form
            class="mb-3 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-[1fr_max-content] sm:gap-y-4 md:gap-4"
          >
            <div class="relative flex w-full items-center">
              <input
                type="email"
                class="flex size-full min-h-11 border border-border-primary bg-background-primary py-2 align-middle file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 px-3"
                id="email"
                placeholder="Enter your email"
                value=""
              />
            </div>
            <button
              class="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary text-text-primary bg-background-primary px-5 py-2"
              title="Subscribe"
            >
              Subscribe
            </button>
          </form>
          <div>
            <p class="text-xs">
              By subscribing you agree to with our
              <a href="#" class="underline">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
      <div class="h-px w-full bg-black"></div>
      <div
        class="flex flex-col items-start justify-start pb-4 pt-6 text-sm md:flex-row md:items-center md:justify-between md:pb-0 md:pt-8 md:text-center"
      >
        <ul
          class="grid grid-flow-row grid-cols-[max-content] gap-y-4 text-sm md:grid-flow-col md:gap-x-6 md:gap-y-0 lg:justify-center"
        >
          <li class="underline decoration-black underline-offset-1">
            <a href="#">Privacy Policy</a>
          </li>
          <li class="underline decoration-black underline-offset-1">
            <a href="#">Terms of Service</a>
          </li>
          <li class="underline decoration-black underline-offset-1">
            <a href="#">Cookies Settings</a>
          </li>
        </ul>
        <p class="mt-8 md:mt-0">© 2024 Relume. All rights reserved.</p>
      </div>
    </div>
  </footer>
  
</template>
