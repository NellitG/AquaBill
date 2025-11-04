<template>
  <main class=" bg-slate-950  text-white">
  <div class="  ">
    <div class=" flex flex-col md:flex-row gap-12  ">
      <img
        class="w-[500px] h-[500px] rounded-lg py-2 px-5"
        src="../assets/portfolio.jpg"
        alt="image"
      />

      <div class="">
        <p class=" container pt-4 bg-white text-black rounded-lg p-2 m-2 pr-5 mr-4 ">
          🚀 Frontend Developer | UI/UX Enthusiast | Kabarak University Graduate
          Passionate and detail-oriented frontend developer with a strong
          foundation in JavaScript/TypeScript and its frameworks, including
          React.js and Vue.js. Proven expertise in crafting modern, highly
          performant UIs with proficiency in CSS, Sass, and Tailwind CSS. 🛠️
          Skills: Languages: JavaScript/TypeScript Frameworks: React.js, Vue.js
          Styling: CSS, Sass, Tailwind CSS Version Control: Git Collaboration:
          Experienced in both team and individual settings 👨‍💻 Experience:
          Successfully contributed to the development of impactful projects,
          showcasing a keen eye for UI/UX design and optimization. Collaborated
          effectively with diverse teams, ensuring the delivery of high-quality,
          user-friendly applications. 📚 Ongoing Learning: Eager to broaden my
          skill set by venturing into backend technologies, currently exploring
          Nest.js. 🔗 Let's Connect: Open to new opportunities, collaboration,
          and networking with like-minded professionals. Let's build something
          great together!
        </p>
      </div>
    </div>

    <!-- another sub page -->
     <span class=" text-orange-400 text-3xl ">Experiences </span>
 <div class=" flex flex-col md:flex-row p-3 m-3 gap-3">
  
  <div>      
      
      <h1 class="text-orange-400 text-xl font-bold mb-2 italic">Lish Ai Labs</h1>
      <p class=" text-white ">
        Working on a variety of projects and software that enables<br />
        smooth workflow of work and transitioning from paperwork to<br />
        Digital work. Creating software that enables tracking of online
        work and earnings.
      </p>
</div>


  <div class=" "> 
    <div>
      <h1 class="text-orange-400 font-bold italic">County Goverment of Nakuru</h1>
      <p class=" text-white  ">IT assistant</p>
      <p class=" text-white">
        Configuration of network and hardware. Assembling of hardware.<br />
        Connecting of internet
      </p>
     
       </div>
  </div>



<div class=" ">

       <h1 class="text-orange-400 font-bold italic">KNLS</h1>
        <p class=" text-white">Kenya National Library Service IT assistant</p>
        <p>Networking and Hardware Configuration</p>
</div>


<div>
   
              <span class=" text-orange-400">Kabarak University</span >
            <div class="">
              <p1>Degree in Computer Science.</p1>
                <p>Diploma in Computer Science</p>
              </div>
</div>


 


 <div class="">
               <span class="material-symbols-outlined text-orange-500"> redeem</span >
             
              <h1>Certificate in Programming</h1>
              <p>IAT</p>  
    </div>
    </div>
  </div>


  <!-- another page -->

  <div class="bg-gray-950 text-white p-4">
    <h1 class="text-3xl font-bold mb-8 text-center">SKILLS</h1>

    <div class=" flex flex-col md:flex-row  items-center justify-center gap-5 ">
      <div v-for="(skill, index) in skills" :key="index" class="w-full md:w-[48%] lg:w-[30%]">
        <div class="mb-4">
          <img :src="`../assets/${skill.image}`" alt="" class="w-full h-auto">
        </div>
        <div class="flex justify-center items-center mb-2">
          <h1 class="text-lg font-bold mr-2">{{ skill.title }}</h1>
          <span class="material-symbols-outlined text-orange-600">
            clock_loader_{{ skill.progress }}
          </span>
        </div>
        <div class="text-center">
          <p class="text-sm">{{ skill.description }}</p>
        </div>
      </div>
    </div>
  </div>
  </main>
 
</template>

<script>
export default {
  data() {
    return {
      skills: [
        {
          title: 'HTML',
          image: 'html.jpg',
          progress: 90,
          description: 'Skilled in crafting clean and semantic HTML code to create responsive and visually appealing websites. Expertise in structuring content, implementing forms, and ensuring cross-browser compatibility. Demonstrated ability to enhance user experience through proper markup and adherence to web standards.',
        },
        {
          title: 'CSS',
          image: 'css.jpg',
          progress: 60,
          description: 'Adept at leveraging CSS to design and style web interfaces with a keen eye for aesthetics and responsiveness. Proficient in layout design, typography, and implementing modern CSS features. Skillful in creating visually engaging and user-friendly websites through effective styling and consistent branding.',
        },
        {
          title: 'JS',
          image: 'js.jpg',
          progress: 60,
          description: 'Proficient in leveraging JavaScript to create dynamic and interactive web applications. Skilled in DOM manipulation, event handling, and asynchronous programming. Experience with popular frameworks and libraries to build efficient and responsive user interfaces, enhancing overall user experience.',
        },
        {
          title: 'Vue',
          image: 'vue.jpg',
          progress: 60,
          description: 'Experienced in developing dynamic and interactive web applications using Vue.js. Proficient in component-based architecture, state management, and leveraging Vue\'s reactivity system to create seamless user interfaces. Strong understanding of Vue\'s ecosystem and ability to integrate it effectively to enhance overall application performance.',
        },
        {
          title: 'Angular',
          image: 'angular.jpg',
          progress: 40,
          description: 'Proficient in building dynamic and interactive web applications using Angular. Strong command of TypeScript, modular architecture, and reactive programming. Experience in creating responsive UI components, handling data binding, and optimizing performance for seamless user experiences. Proven ability to develop scalable and maintainable codebases with a focus on code organization and best practices.',
        },
        {
          title: 'React',
          image: 'react.jpg',
          progress: 60,
          description: 'Experienced in building dynamic and interactive user interfaces using React.js. Proficient in state management, component-based architecture, and integrating with RESTful APIs. Adept at creating responsive and performant web applications, with a strong focus on code modularity and reusability. Passionate about staying updated with the latest React trends and best practices.',
        },
        // Add more skills as needed
      ],
    };
  },
};
</script>

<style scoped>
/* Custom CSS for hover effect */
.pop {
  transform: scale(1.05);
  transition: transform 0.6s ease-in-out;
}
.hover\:shadow-xl:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.hover\:shadow-xl:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
