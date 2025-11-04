<template>
  <div
    class="flex min-h-screen w-screen items-center justify-center text-gray-600 bg-gray-50"
  >
    <div class="relative">
      <div
        class="hidden sm:block h-56 w-56 text-orange-300 absolute a-z-10 -left-20 -top-20"
      >
        <svg
          id="patternId"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="a"
              patternUnits="userSpaceOnUse"
              width="40"
              height="40"
              patternTransform="scale(0.6) rotate(0)"
            >
              <rect x="0" y="0" width="100%" height="100%" fill="none" />
              <path
                d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                stroke-width="1"
                stroke="none"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="800%"
            height="800%"
            transform="translate(0,0)"
            fill="url(#a)"
          />
        </svg>
      </div>
      <div
        class="hidden sm:block h-28 w-28 text-orange-300 absolute a-z-10 -right-20 -bottom-20"
      >
        <svg
          id="patternId"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="b"
              patternUnits="userSpaceOnUse"
              width="40"
              height="40"
              patternTransform="scale(0.5) rotate(0)"
            >
              <rect x="0" y="0" width="100%" height="100%" fill="none" />
              <path
                d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                stroke-width="1"
                stroke="none"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="800%"
            height="800%"
            transform="translate(0,0)"
            fill="url(#b)"
          />
        </svg>
      </div>
      <!-- Register -->
      <div
        class="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-green-100 shadow-lg px-4"
      >
        <div class="flex-auto p-6">
          <!-- Logo -->
          <div
            class="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden"
          >
            <a
              href="#"
              class="flex cursor-pointer items-center gap-2 text-orange-500 no-underline hover:text-orange-500"
            >
              <img
                class="h-8 mr-4"
                src="https://airhex.com/images/airline-logos/tailwind-airlines.png"
                alt="Your Logo"
                width="100"
              />
            </a>
          </div>
          <!-- /Logo -->
          <h4 class="mb-2 font-medium text-gray-700 xl:text-xl">
            Login To Tusafiri
          </h4>
          <p class="mb-6 text-gray-500">Please Login to access your account</p>

          <form id="" class="mb-4" action="#" method="POST">
            <div class="mb-4">
              <label
                for="email"
                class="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                >Email</label
              >
              <input
                type="text"
                class="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-orange-500 focus:bg-white focus:text-gray-600 focus:shadow"
                id="email"
                name="email-username"
                placeholder="Enter your email"
              />
            </div>
            <div class="mb-4">
              <div class="flex justify-between">
                <label
                  class="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                  for="password"
                  >Password</label
                >
                <a
                  href="auth-forgot-password-basic.html"
                  class="cursor-pointer text-orange-500 no-underline hover:text-orange-500"
                >
                  <small class=" ">Forgot Password?</small>
                </a>
              </div>
              <div class="relative flex w-full flex-wrap items-stretch">
                <input
                  type="password"
                  id="password"
                  class="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-orange-500 focus:text-gray-600 focus:shadow"
                  name="password"
                  placeholder="············"
                />
              </div>
            </div>
            <div class="mb-4">
              <div class="block">
                <label class="inline-block" for="remember-me">
                  Remember Me
                </label>
              </div>
            </div>
            <div class="mb-4">
              <button
                class="grid w-full cursor-pointer select-none rounded-md border border-orange-500 bg-orange-500 py-2 px-5 text-center align-middle text-sm text-black shadow hover:border-orange-600 hover:bg-orange-600 hover:text-white focus:border-orange-600 focus:bg-orange-600 focus:text-white focus:shadow-none"
                type="submit"
              >
                Sign in
              </button>
            </div>
          </form>
          <div class="mb-4 flex items-center justify-center">
            <span class="text-xs text-gray-500">Or sign in with</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <!-- Google -->
            <button
              class="flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow hover:border-orange-500 hover:text-orange-600 transition-colors sm:px-3 sm:py-2 sm:text-sm xs:px-2 xs:py-1 xs:text-xs"
              title="Sign up with Google"
            >
              <svg
                class="w-5 h-5 sm:w-4 sm:h-4 xs:w-4 xs:h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <defs>
                  <radialGradient
                    id="prefix__b"
                    cx="1.479"
                    cy="12.788"
                    fx="1.479"
                    fy="12.788"
                    r="9.655"
                    gradientTransform="matrix(.8032 0 0 1.0842 2.459 -.293)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset=".368" stop-color="#ffcf09" />
                    <stop
                      offset=".718"
                      stop-color="#ffcf09"
                      stop-opacity=".7"
                    />
                    <stop offset="1" stop-color="#ffcf09" stop-opacity="0" />
                  </radialGradient>
                  <radialGradient
                    id="prefix__c"
                    cx="14.295"
                    cy="23.291"
                    fx="14.295"
                    fy="23.291"
                    r="11.878"
                    gradientTransform="matrix(1.3272 0 0 1.0073 -3.434 -.672)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset=".383" stop-color="#34a853" />
                    <stop
                      offset=".706"
                      stop-color="#34a853"
                      stop-opacity=".7"
                    />
                    <stop offset="1" stop-color="#34a853" stop-opacity="0" />
                  </radialGradient>
                  <linearGradient
                    id="prefix__d"
                    x1="23.558"
                    y1="6.286"
                    x2="12.148"
                    y2="20.299"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset=".671" stop-color="#4285f4" />
                    <stop offset=".885" stop-color="#4285f4" stop-opacity="0" />
                  </linearGradient>
                  <clipPath id="prefix__a">
                    <path
                      d="M22.36 10H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53h-.013l.013-.01c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09c.87-2.6 3.3-4.53 6.16-4.53 1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07 1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93v.01C3.99 20.53 7.7 23 12 23c2.97 0 5.46-.98 7.28-2.66 2.08-1.92 3.28-4.74 3.28-8.09 0-.78-.07-1.53-.2-2.25z"
                      fill="none"
                    />
                  </clipPath>
                </defs>
                <path
                  d="M22.36 10H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53h-.013l.013-.01c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09c.87-2.6 3.3-4.53 6.16-4.53 1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07 1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93v.01C3.99 20.53 7.7 23 12 23c2.97 0 5.46-.98 7.28-2.66 2.08-1.92 3.28-4.74 3.28-8.09 0-.78-.07-1.53-.2-2.25z"
                  fill="#fc4c53"
                />
                <g clip-path="url(#prefix__a)">
                  <ellipse
                    cx="3.646"
                    cy="13.572"
                    rx="7.755"
                    ry="10.469"
                    fill="url(#prefix__b)"
                  />
                  <ellipse
                    cx="15.538"
                    cy="22.789"
                    rx="15.765"
                    ry="11.965"
                    transform="rotate(-7.12 15.539 22.789)"
                    fill="url(#prefix__c)"
                  />
                  <path
                    fill="url(#prefix__d)"
                    d="M11.105 8.28l.491 5.596.623 3.747 7.362 6.848 8.607-15.897-17.083-.294z"
                  />
                </g>
              </svg>
              <span class="inline sm:inline">Google</span>
            </button>
            <!-- Facebook -->
            <button
              class="flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow hover:border-blue-600 hover:text-blue-600 transition-colors sm:px-3 sm:py-2 sm:text-sm xs:px-2 xs:py-1 xs:text-xs"
              title="Sign up with Facebook"
            >
              <svg
                class="w-5 h-5 sm:w-4 sm:h-4 xs:w-4 xs:h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 509 509"
                fill="none"
              >
                <g fill-rule="nonzero">
                  <path
                    fill="#0866FF"
                    d="M509 254.5C509 113.94 395.06 0 254.5 0S0 113.94 0 254.5C0 373.86 82.17 474 193.02 501.51V332.27h-52.48V254.5h52.48v-33.51c0-86.63 39.2-126.78 124.24-126.78 16.13 0 43.95 3.17 55.33 6.33v70.5c-6.01-.63-16.44-.95-29.4-.95-41.73 0-57.86 15.81-57.86 56.91v27.5h83.13l-14.28 77.77h-68.85v174.87C411.35 491.92 509 384.62 509 254.5z"
                  />
                  <path
                    fill="#fff"
                    d="M354.18 332.27l14.28-77.77h-83.13V227c0-41.1 16.13-56.91 57.86-56.91 12.96 0 23.39.32 29.4.95v-70.5c-11.38-3.16-39.2-6.33-55.33-6.33-85.04 0-124.24 40.16-124.24 126.78v33.51h-52.48v77.77h52.48v169.24c19.69 4.88 40.28 7.49 61.48 7.49 10.44 0 20.72-.64 30.83-1.86V332.27h68.85z"
                  />
                </g>
              </svg>
              <span class="sm:inline">Facebook</span>
            </button>
            <!-- Apple -->
            <button
              class="flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow hover:border-black hover:text-black transition-colors sm:px-3 sm:py-2 sm:text-sm xs:px-2 xs:py-1 xs:text-xs"
              title="Sign up with Apple"
            >
              <svg
                class="w-5 h-5 sm:w-4 sm:h-4 xs:w-4 xs:h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                fill="currentColor"
              >
                <path
                  d="M494.782 340.02c-.803-81.025 66.084-119.907 69.072-121.832-37.595-54.993-96.167-62.552-117.037-63.402-49.843-5.032-97.242 29.362-122.565 29.362-25.253 0-64.277-28.607-105.604-27.85-54.32.803-104.4 31.594-132.403 80.245C29.81 334.457 71.81 479.58 126.816 558.976c26.87 38.882 58.914 82.56 100.997 81 40.512-1.594 55.843-26.244 104.848-26.244 48.993 0 62.753 26.245 105.64 25.406 43.606-.803 71.232-39.638 97.925-78.65 30.887-45.12 43.548-88.75 44.316-90.994-.969-.437-85.029-32.634-85.879-129.439l.118-.035zM414.23 102.178C436.553 75.095 451.636 37.5 447.514-.024c-32.162 1.311-71.163 21.437-94.253 48.485-20.729 24.012-38.836 62.28-33.993 99.036 35.918 2.8 72.591-18.248 94.926-45.272l.036-.047z"
                />
              </svg>
              <span class="sm:inline">Apple</span>
            </button>
          </div>
          <br />

          <p class="mb-4 text-center">
            New on Tusafiri
            <a
              href="/SignUp"
              class="cursor-pointer text-orange-500 no-underline hover:text-orange-500"
            >
              Create an account
            </a>
          </p>
        </div>
      </div>
      <!-- /Register -->
    </div>
  </div>
</template>
