<script setup>
import { inject } from 'vue'

import CartItem from './CartItem.vue'

const carts = inject('cart')
</script>

<template>
  <div class="flex flex-col gap-4 mb-7">
    <CartItem
      v-for="cart in carts"
      :key="cart.id"
      :title="cart.title"
      :price="cart.price"
      :imageUrl="cart.imageUrl"
    />
  </div>
</template>
