<script setup>
defineProps({
  title: String,
  price: Number,
  imageUrl: String,
  onClickPlus: Function,
  onClickLike: Function,
  isLiked: Boolean,
  isAdded: Boolean
})

const baseUrl = import.meta.env.BASE_URL
</script>

<template>
  <div
    class="relative border border-slate-100 rounded-3xl p-8 cursor-pointer transition hover:translate-y-2 hover:shadow-xl"
  >
    <img
      @click="onClickLike"
      :src="`${baseUrl}${isLiked ? '/like-2.svg' : '/like-1.svg'}`"
      alt="Like 1"
      class="absolute top-8 left-8"
    />
    <img :src="baseUrl + imageUrl" alt="Sneaker" />
    <p class="mt-2">{{ title }}</p>

    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-500">Цена:</span>
        <b>{{ price }} руб.</b>
      </div>

      <img @click="onClickPlus" :src="`${baseUrl}${isAdded ? '/checked.svg' : '/plus.svg'}`" alt="Plus" />
    </div>
  </div>
</template>
