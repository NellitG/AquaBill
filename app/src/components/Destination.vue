<template>
    <section id="relume" class="relative h-[250vh]">
    <div class="px-[5%] pt-16 md:pt-24 lg:pt-28">
      <div class="container">
        <div class="w-full max-w-lg">
          <h1 class="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-5xl">
            Long heading is what you see here in this header section
          </h1>
          <p class="md:text-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
            elementum tristique.
          </p>
          <div class="mt-6 flex flex-wrap gap-4 md:mt-8">
            <button
              class="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary bg-background-alternative text-text-alternative px-6 py-3"
              title="Button"
            >
              Button</button
            ><button
              class="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary text-text-primary bg-background-primary px-6 py-3"
              title="Button"
            >
              Button
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="sticky top-0 flex h-screen w-full items-center overflow-hidden">
      <div
        class="z-10 grid w-full grid-flow-col grid-cols-[25%_50%_25%] justify-center md:grid-cols-[50%_30%_20%]"
        style="height: 70vh"
      >
        <div
          class="grid grid-flow-col grid-cols-1 justify-items-end gap-4 justify-self-end px-4"
          style="transform: none"
        >
          <div class="relative top-[5%] hidden w-[40vw] sm:w-[25vw] md:block lg:w-[22vw]">
            <img
              class="aspect-[2/3] w-full object-cover"
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              alt="Relume placeholder image 1"
            />
          </div>
          <div class="relative top-[-5%] flex flex-col gap-4 self-center">
            <div class="relative w-[30vw] flex-none md:w-[15vw]">
              <img
                class="aspect-square w-full object-cover"
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 2"
              />
            </div>
            <div class="relative w-[30vw] flex-none md:w-[15vw]">
              <img
                class="aspect-[3/4] w-full object-cover"
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 3"
              />
            </div>
          </div>
          <div class="relative top-[15%] hidden w-[40vw] sm:w-[25vw] md:block lg:w-[22vw]">
            <img
              class="aspect-square w-full object-cover"
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              alt="Relume placeholder image 4"
            />
          </div>
        </div>
        <div class="relative" style="width: 30vw; height: 70vh; transform: none">
          <img
            class="size-full object-cover"
            src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
            alt="Relume placeholder image 5"
          />
        </div>
        <div
          class="grid grid-flow-col grid-cols-1 gap-4 justify-self-start px-4"
          style="transform: none"
        >
          <div class="relative top-[5%] w-[40vw] md:w-[25vw] lg:w-[22vw]">
            <img
              class="aspect-[3/4] w-full object-cover"
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              alt="Relume placeholder image 6"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="absolute inset-0 -z-10 mt-[100vh]"></div>
  </section>
  
  
</template>