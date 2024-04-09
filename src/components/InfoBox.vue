<script setup>
defineProps({
  imageUrl: String,
  title: String,
  description: String
})
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center w-72 mx-auto">
    <img height="70" width="70" :src="imageUrl" alt="Info Box" />
    <h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
    <p class="text-gray-400">{{ description }}</p>
  </div>
</template>
