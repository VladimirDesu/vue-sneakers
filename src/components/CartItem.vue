<script setup>

defineProps({
  title: String,
  price: Number,
  imageUrl: String
})

const emit = defineEmits(['removeFromCart'])
</script>

<template>
  <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4">
    <img class="w-16 h-16" :src="imageUrl" alt="Sneaker" />

    <div class="flex flex-col w-full">
      <p>{{ title }}</p>

      <div class="flex justify-between mt-2">
        <b>{{ price }} руб.</b>
        <img
          @click="emit('removeFromCart')"
          class="opacity-40 hover:opacity-100 cursor-pointer transition"
          src="/close.svg"
        />
      </div>
    </div>
  </div>
</template>
