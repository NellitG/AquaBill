<template>
  <div class="bg-gray-50 p-6 max-w-7xl mx-auto">

    <!-- If no product is selected, show grid -->
    <div v-if="!selectedProduct">
      <h2 class="text-2xl font-bold mb-6">Popular Products</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="product in products" 
          :key="product.id"
          @click="viewProduct(product)"
          class="cursor-pointer border rounded-lg overflow-hidden shadow-sm bg-white hover:shadow-md transition-shadow"
        >
          <div class="bg-gray-200 h-64 flex items-center justify-center relative">
            <span v-if="product.tag" class="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">{{ product.tag }}</span>
            <img :src="product.image" :alt="product.name" class="w-full h-full object-cover"/>
          </div>
          <div class="p-4">
            <h3 class="font-semibold">{{ product.name }}</h3>
            <p class="text-sm text-gray-600 mt-2 line-clamp-2">{{ product.description }}</p>
            <div class="flex justify-between items-center mt-4">
              <span class="text-lg font-semibold">${{ product.price }}</span>
              <button class="bg-green-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-md transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- If a product is selected, show detail -->
    <div v-else class="p-6 bg-white rounded-lg shadow">
      <button @click="selectedProduct = null" class="text-blue-500 mb-4">← Back to products</button>
      <div class="flex flex-col md:flex-row gap-6">
        <img :src="selectedProduct.image" class="w-full md:w-1/2 rounded-lg object-cover" />
        <div>
          <h2 class="text-2xl font-bold">{{ selectedProduct.name }}</h2>
          <p class="mt-2 text-gray-600">{{ selectedProduct.description }}</p>
          <p class="mt-4 text-xl font-semibold text-green-600">${{ selectedProduct.price }}</p>
          <button class="mt-4 bg-green-500 hover:bg-orange-600 text-white text-sm px-6 py-3 rounded-md transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>

  </div>
</template>
<script setup>
import { ref } from 'vue'

const products = ref([
  {
    id: 1,
    name: 'Suitcase',
    price: 199,
    oldPrice: 249,
    image: 'https://img.freepik.com/free-vector/travel-suitcase-realistic_1284-4831.jpg',
    description: 'Premium travel suitcase with durable shell.',
    rating: 5,
    reviews: 128,
    tag: 'Sale'
  },
  {
    id: 2,
    name: 'Duffle Bag',
    price: 159,
    image: 'https://img.freepik.com/free-photo/gray-duffle-bag-unisex-accessory_53876-101500.jpg',
    description: 'Stylish duffle bag for travel and gym.',
    rating: 4,
    reviews: 89,
    tag: 'Low Stock'
  },
  {
    id: 3,
    name: 'Hiking Boots',
    price: 129,
    image: 'https://img.freepik.com/free-photo/leather-boots_1203-8146.jpg',
    description: 'Durable leather boots built for tough terrain.',
    rating: 5,
    reviews: 256,
    tag: 'Bestseller'
  }
])

const selectedProduct = ref(null)

function viewProduct(product) {
  selectedProduct.value = product
}
</script>
