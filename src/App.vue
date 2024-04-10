<script setup>
import { onMounted, ref, watch, provide, computed } from 'vue'
import axios from 'axios'

import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

const mainUrl = 'https://e89a320cd8447947.mokky.dev'
const url = {
  favourites: mainUrl + '/favourites',
  orders: mainUrl + '/orders',
  sneakers: mainUrl + '/sneakers'
}

const cart = ref([])

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))

const drawerOpened = ref(false)

const addToFavourite = async (item) => {
  try {
    if (!item.isFavourite) {
      const obj = {
        sneaker_id: item.id
      }
      item.isFavourite = true

      const { data } = await axios.post(url.favourites, obj)

      item.favouriteId = data.id
    } else {
      item.isFavourite = false

      await axios.delete(`${url.favourites}/${item.favouriteId}`)

      item.favouriteId = null
    }
  } catch (err) {
    console.log(err)
  }
}

const toggleDrawer = () => {
  drawerOpened.value = !drawerOpened.value
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []
})

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

provide('toggleDrawer', toggleDrawer)
provide('cart', {
  cart,
  addToCart,
  removeFromCart
})
provide('url', url)
provide('addToFavourite', addToFavourite)
</script>

<template>
  <Drawer
    v-if="drawerOpened"
    @toggleDrawer="toggleDrawer"
    :totalPrice="totalPrice"
  />
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header @toggleDrawer="toggleDrawer" :totalPrice="totalPrice" />
    <div class="p-10">
      <RouterView />
    </div>
  </div>
</template>
