<script setup>
import { onMounted, ref, watch, reactive, inject } from 'vue'
import axios from 'axios'
import debounce from 'lodash.debounce'

import CardList from '../components/CardList.vue'

const { cart, addToCart, removeFromCart } = inject('cart')
const url = inject('url')
const addToFavourite = inject('addToFavourite')

const items = ref([])

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onClickPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value
}, 500)

const fetchFavorites = async () => {
  try {
    const { data: favourites } = await axios.get(url.favourites)

    items.value = items.value.map((item) => {
      const favourite = favourites.find((favourite) => favourite.sneaker_id === item.id)

      if (!favourite) {
        return item
      }

      return {
        ...item,
        isFavourite: true,
        favouriteId: favourite.id
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }
    const { data } = await axios.get(url.sneakers, {
      params
    })
    items.value = data
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  await fetchItems()
  await fetchFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(filters, fetchItems)

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})
</script>

<template>
  <div class="flex justify-between mb-8">
    <h2 class="text-3xl font-bold">Все кроссовки</h2>

    <div class="flex items-center gap-4">
      <select
        @change="onChangeSelect"
        class="border rounded-md py-2 px-4 outline-none transition focus:border-gray-400"
      >
        <option value="name">По названию</option>
        <option value="price">По цене (дешевые)</option>
        <option value="-price">По цене (дорогие)</option>
      </select>

      <div class="relative">
        <img src="/search.svg" class="absolute left-4 top-3" />
        <input
          @input="onChangeSearchInput"
          class="border rounded-md py-2 pl-11 pr-4 outline-none transition focus:border-gray-400"
          type="text"
          placeholder="Поиск..."
        />
      </div>
    </div>
  </div>

  <CardList :items="items" @addToFavourite="addToFavourite" @addToCart="onClickPlus" />
</template>
