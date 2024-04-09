<script setup>
import Card from './Card.vue'

defineProps({
  items: Array
})

const emit = defineEmits(['addToFavourite', 'addToCart'])
</script>

<template>
  <div v-auto-animate class="grid grid-cols-4 gap-8">
    <Card
      v-for="item in items"
      :key="item.id"
      :title="item.title"
      :price="item.price"
      :imageUrl="item.imageUrl"
      :onClickLike="() => emit('addToFavourite', item)"
      :onClickPlus="() => emit('addToCart', item)"
      :isLiked="item.isFavourite"
      :isAdded="item.isAdded"
    />
  </div>
</template>
