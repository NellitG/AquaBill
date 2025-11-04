<template>
  <div class="bg-white text-gray-700">
    <!-- Get In Touch Section -->
    <div class="container mx-auto px-4 py-12">
      <h2 class="text-3xl font-bold mb-6">Get In Touch</h2>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <!-- Contact Form -->
        <div class="lg:col-span-2 bg-slate-950 p-6 rounded-lg shadow-md">
          <form class="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              class="border-2 border-gray-300 p-2 rounded-md"
            />
            <input
              type="email"
              placeholder="Email Address"
              class="border-2 border-gray-300 p-2 rounded-md"
            />
            <textarea
              placeholder="Message"
              class="border-2 border-gray-300 p-2 rounded-md h-32"
            ></textarea>
            <button
              type="submit"
              class="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
            >
              Submit
            </button>
          </form>
        </div>

        <!-- Contact Info Cards -->
        <div class="space-y-4">
          <!-- Single Card Example -->
          <div class="flex items-center space-x-4 bg-orange-500 p-4 rounded-lg">
            <span class="material-symbols-outlined"> mail </span>
            <div>
              <h3 class="font-semibold">Email</h3>
              <p class="text-sm">julietwambuku361@gmail.com</p>
            </div>
          </div>
          <!-- Repeat for Phone and Address -->
        </div>
      </div>

      <!-- Working Hours -->
      <div
        class="bg-orange-500 p-6 rounded-lg shadow-md mb-12 text-center lg:w-96"
      >
        <h3 class="font-semibold mb-4">Working Hours</h3>
        <!-- Repeat for each day -->
        <p>All days: 8am - 6pm</p>
        <p class="flex justify-center">
          Holidays & Sundays:
          <span class="material-symbols-outlined text-slate-950"> close </span>
        </p>
      </div>

      <!-- FAQ -->
      <div class="mb-12">
        <h3 class="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
        <!-- Questions List -->
        <div class="space-y-3 mb-8">
          <div>
            <h4 class="font-semibold text-slate-950">What is Responsive Web Design?</h4>
            <p>
              Responsive Web Design (RWD) is an approach to web design aimed at
              crafting sites to provide an optimal viewing and interaction
              experience—easy reading and navigation with a minimum of resizing,
              panning, and scrolling—across a wide range of devices (from
              desktop computer monitors to mobile phones).
            </p>
          </div>
          <div>
             <h4 class="font-semibold text-slate-950">
              Can you explain the difference between Flexbox and CSS Grid?
            </h4>
            <p>
              Flexbox is a one-dimensional layout method for laying out items in
              rows or columns. CSS Grid is a two-dimensional layout method that
              allows you to create complex layouts with rows and columns.
              Flexbox is used for small-scale layouts, while Grid is used for
              larger scale layouts.
            </p>
          </div>
          <div>
           <h4 class="font-semibold text-slate-950">
              What are some ways to optimize website performance?
            </h4>
            <p>
              Optimizing images, using CDN for static assets, minifying CSS and
              JavaScript files, leveraging browser caching, and reducing HTTP
              requests are common ways to improve website performance.
            </p>
          </div>
          <div>
            <h4 class="font-semibold text-slate-950">
              How do you ensure your websites are accessible?
            </h4>
            <p>
              I follow the WCAG guidelines, use semantic HTML, ensure proper
              contrast ratios, implement ARIA attributes where necessary, and
              regularly use tools and audits for accessibility checks.
            </p>
          </div>
          <!-- Repeat for other questions -->
        </div>
        <!-- Ask a Different Question Form -->
        <h1 class="text-center text-2xl">Any Question ?</h1>
        <form class="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email Address"
            class="border-2 border-gray-300 p-2 rounded-md"
          />
          <textarea
            placeholder="Your Question"
            class="border-2 border-gray-300 p-2 rounded-md h-32"
          ></textarea>
          <button
            type="submit"
            class="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
// Your script setup logic goes here
</script>

<style>
/* You can add additional global styles if needed */
</style>
