<template>
  <main class="app">
  <div class="bg-slate-950 w-full">
    <div class="background-container">
      <!-- Text on top of the background image -->
      <div class="overlay-text">
        <div>
          <span class="text-slate-950 font-bold text-4xl">Welcome !</span>
        </div>
        <span class="text-black">I'm</span>&nbsp;
        <span v-for="(letter, index) in animatedText" :key="index">
          {{ letter }}
        </span>

        <div class="flex flex-row space-x-10 justify-center">
          <button
            class="border rounded-full text-sm border-orange-500 px-4 font-bold text-white"
          >
            View My Work
          </button>
          <button
            class="border rounded-full text-sm border-orange-500 px-4 font-bold text-white"
          >
            My CV
          </button>
        </div>
      </div>
    </div>
    <div class="grid grid-col-1 lg:grid-cols-3 text-white lg:px-10 ">
      <!-- <div class="mt-80 px-48">
        <div class="flex flex-col space-y-8">
          <div class="flex flex-row space-x-6">
            <span class="text-white">Web Design</span>
            <span class="material-symbols-outlined"> sliders </span>
          </div>
          <div class="flex flex-row space-x-6">
            <span class="text-white">Developement</span>
            <span class="material-symbols-outlined"> sliders </span>
          </div>
        </div>
      </div> -->
      <div class=" mt-8">
        <img
          class=" hover:scale-105 w-96 h-96 rounded-full"
          src="../assets/portfolio.jpg"
          alt="image"
        />
      </div>
      <div class="mt-8 mx-4">
        <div class="">
          <span class="text-orange-500 text-3xl">JULIET .K. WAMBUKU</span>
        </div>
        <div class="mt-2 w-64 text-start">
          <span class="text-orange-500 italic text-sm"
            >Professional Front-End Developer</span
          >
        </div>

      <p class="">
        As a front-end developer proficient in React and Vue frameworks, I'll
        be adept at building dynamic and responsive user interfaces. Using
        React, I'll create reusable components and manage state efficiently,
        while Vue allows for simplicity and ease of integration.
      </p>
 
 
      </div>
    </div>
    <div class=" flex flex-col md:flex-row  text-white lg:grid-cols-4 gap-4 px-12">
      <div class="flex flex-col ">
        <!-- <span class="material-symbols-outlined text-orange-500"> design </span> -->
       
        <span class=" text-orange-500 text-3xl pb-3 ">Web Design</span>
        <p class=" hover:text-orange-500 shadow-orange-600 ">
          Strategic planning, creation, and arrangement of visual elements,
          content, and interactive features to craft an engaging and
          user-friendly digital experience.
        </p>
      </div>
      <div class="flex flex-col shadow-orange-600">
        <!-- <span class="material-symbols-outlined text-orange-500"> code </span> -->
        <span class="  text-orange-500 text-3xl pb-3">Web Developement</span>
        <p class="  hover:text-orange-500 ">
          Creating and maintaining websites or web applications. It encompassess<br /> 
          a range of tasks, including web design, front-end development,
          back-end development, and web server configuration.
        </p>
      </div>
      <div class="flex flex-col shadow-orange-600">
        <!-- <span class="material-symbols-outlined text-orange-500">
          monitoring
        </span> -->
        <span class="  text-orange-500 text-3xl pb-3">Data Analysis</span>
        <p class="   hover:text-orange-500 ">
          Examining raw data to identify trends, draw conclusions, and makes<br /> 
          informed decisions. Analysts use various statistical and mathematical
          techniques to uncover patterns, relationships, and insights within
          datasets.
        </p>
      </div>
      <div class="flex flex-col shadow-orange-600">
        <!-- <span class="material-symbols-outlined text-orange-500">
          database
        </span> -->
        <span class="  text-orange-500 text-3xl pb-3">Data Mangement</span>
        <p class=" text-start   hover:text-orange-500 ">
          Acquiring, storing, organizing, and maintaining data throughout its<br /> 
          lifecycle. It involves a systematic approach to handling data
          resources efficiently and securely.
        </p>
      </div>
    </div>
    <div class=" grid grid-cols-3 mt-4 gap-10 p-3 text-white">
      <div class="flex flex-col shadow-orange-600">
        <span
          class="material-symbols-outlined text-orange-500 hover:animate-bounce"
        >
          school
        </span>
        <span>2</span>
        <span class="text-xl text-orange-500">Year Of Experience</span>
      </div>
      <div class="flex flex-col shadow-orange-600">
        <span
          class="material-symbols-outlined text-orange-500 hover:animate-bounce"
        >
          groups
        </span>
        <span>100+</span>
        <span class="text-xl text-orange-500">Reviews </span>
      </div>
      <div class="flex flex-col shadow-orange-600">
        <span
          class="material-symbols-outlined text-orange-500 hover:animate-bounce"
          >diversity_2
        </span>
        <span>50+</span>
        <span class="text-xl text-orange-500">Projects Done</span>
      </div>
    </div>
  </div>
</main>
</template>

<script setup>
import { ref, onMounted } from "vue";

const animatedText = ref([]);
const textToAnimate = "A Front-End Developer";

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

<style scoped>
 
/* Apply background image to the outer div */
.background-container {
  background-image: url("../assets/tech1.jpg"); /* Replace with the actual path to your image */
  background-size: cover; /* Adjust as needed */
  background-position: center; /* Adjust as needed */
  height: 300px; /* Set the desired height for the container */
  position: relative; /* Position relative for absolute positioning of text */
  color: rgb(170, 65, 4); /* Text color */
}

/* Style for the text on top of the background image */
.overlay-text {
  position: absolute;
  top: 50%; /* Position the text vertically at the center */
  left: 50%; /* Position the text horizontally at the center */
  transform: translate(-50%, -50%); /* Center the text precisely */
  text-align: center;
  font-size: 28px; /* Adjust the font size as needed */
  font-weight: bold; /* Optionally, set the font weight */
  white-space: nowrap; /* Prevent line breaks for the animated text */
  overflow: hidden; /* Hide overflowing text */
}
</style>
