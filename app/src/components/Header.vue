<template>
  <header class="relative w-full text-sm ">
    <nav class="text-black py-4 relative">
      <div class="container mx-auto px-4 flex items-center justify-between relative">
        
        <!-- Logo on the left -->
        <div class="flex items-center">
          <img class="h-8 mr-4" src="https://airhex.com/images/airline-logos/tailwind-airlines.png" alt="Your Logo" width="100">
        </div>

        <!-- Centered Navbar Links -->
            <ul class="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
              <li><router-link to="/" class="hover:text-orange-700 font-medium text-gray-700">Destinations</router-link></li>
              <li><router-link to="/travelplan" class="hover:text-orange-700 font-medium text-gray-700">Travel Plan</router-link></li>
              <li><router-link to="/inspiration" class="hover:text-orange-700 font-medium text-gray-700">Inspiration</router-link></li>
              <li><router-link to="/shop" class="hover:text-orange-700 font-medium text-gray-700">Shop</router-link></li>
            </ul>

        <!-- Right side: Auth buttons + Hamburger -->
        <div class="flex items-center space-x-4">
          <a href="/SignUp" class="px-4 py-2 hover:bg-green-500 border border-green-500 text-black rounded-lg">Sign Up</a>
          <a href="/login" class="px-4 py-2 bg-black text-white rounded-lg">Login</a>
  
          <!-- Hamburger icon (mobile only) -->
          <button id="menu-toggle" class="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  </header>
  
</template>

<script></script>
