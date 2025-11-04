<template>
  <section class="px-4 py-12">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl md:text-4xl font-bold">Latest Stories</h2>
        <router-link
          to="/blog"
          class="border-2 text-sm md:text-base px-4 py-2 rounded-full hover:bg-orange-500 hover:text-white transition"
        >
          Read more articles
        </router-link>
      </div>

      <!-- Grid Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Main Story with transition -->
        <transition name="fade" mode="out-in">
          <div class="flex flex-col gap-4" :key="mainStory.title">
            <img :src="mainStory.image" alt="Main Story" class="rounded-2xl w-full object-cover h-64 md:h-96" />
            <div>
              <p class="text-blue-600 text-sm font-medium mb-1">{{ mainStory.category }}</p>
              <h3 class="font-semibold text-xl leading-tight mb-2">{{ mainStory.title }}</h3>
              <p class="text-sm text-gray-500 mb-2">{{ mainStory.date }} • {{ mainStory.readTime }}</p>
              <p class="text-gray-600 text-sm">{{ mainStory.excerpt }}</p>
            </div>
          </div>
        </transition>

        <!-- Side Stories -->
        <div class="space-y-6">
          <div
            v-for="(story, index) in sideStories"
            :key="index"
            class="flex gap-4"
          >
            <img :src="story.image" :alt="story.title" class="w-28 h-28 object-cover rounded-xl" />
            <div>
              <p class="text-blue-600 text-sm font-medium mb-1">{{ story.category }}</p>
              <h4 class="font-semibold text-md leading-tight">{{ story.title }}</h4>
              <p class="text-sm text-gray-500 mt-1">{{ story.date }} • {{ story.readTime }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const stories = ref([])
const currentIndex = ref(0)

const mainStory = computed(() => {
  const article = stories.value[currentIndex.value] || {}
  return {
    image: article.urlToImage || 'fallback.jpg',
    category: article.source?.name || 'Travel',
    title: article.title || '',
    date: article.publishedAt ? new Date(article.publishedAt).toDateString() : '',
    readTime: '4 min read',
    excerpt: article.description || ''
  }
})

const sideStories = computed(() => {
  return stories.value
    .filter((_, i) => i !== currentIndex.value)
    .slice(0, 3)
    .map(article => ({
      image: article.urlToImage || 'fallback.jpg',
      category: article.source?.name || 'Travel',
      title: article.title,
      date: article.publishedAt ? new Date(article.publishedAt).toDateString() : '',
      readTime: '4 min read'
    }))
})

onMounted(async () => {
  try {
    const res = await fetch('http://127.0.0.1:8000/travelnews/api/travel-news/')
    const data = await res.json()
    if (data.articles && data.articles.length > 0) {
      stories.value = data.articles
    }

    setInterval(() => {
      if (stories.value.length > 1) {
        currentIndex.value = (currentIndex.value + 1) % stories.value.length
      }
    }, 30000)
  } catch (err) {
    console.error('Failed to fetch travel news:', err)
  }
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
