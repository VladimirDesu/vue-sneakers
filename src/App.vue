<script setup>
import { onMounted, ref, watch, reactive, provide } from 'vue'
import axios from 'axios'

import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'

const items = ref([])

const cart = ref([])

const drawerOpened = ref(false)

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value
}

const toggleDrawer = () => {
  drawerOpened.value = !drawerOpened.value
}

const addToCart = (item) => {
  if (!item.isAdded) {
    cart.value.push(item)
    item.isAdded = true
  } else {
    cart.value.splice(cart.value.indexOf(item), 1)
    item.isAdded = false
  }
}

const addToFavourite = async (item) => {
  try {
    if (!item.isFavourite) {
      const obj = {
        parentId: item.id
      }
      item.isFavourite = true

      const { data } = await axios.post('https://e89a320cd8447947.mokky.dev/favourites', obj)

      item.favouriteId = data.id
    } else {
      item.isFavourite = false

      await axios.delete(`https://e89a320cd8447947.mokky.dev/favourites/${item.favouriteId}`)

      item.favouriteId = null
    }
  } catch (err) {
    console.log(err)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favourites } = await axios.get('https://e89a320cd8447947.mokky.dev/favourites')

    items.value = items.value.map((item) => {
      const favourite = favourites.find((favourite) => favourite.parentId === item.id)

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

    const { data } = await axios.get('https://e89a320cd8447947.mokky.dev/sneakers', {
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
})

watch(filters, fetchItems)

provide('toggleDrawer', toggleDrawer)
provide('cart', cart)
</script>

<template>
  <Drawer v-if="drawerOpened" @toggleDrawer="toggleDrawer" />
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header @toggleDrawer="toggleDrawer" />
    <div class="p-10">
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

      <CardList :items="items" @addToFavourite="addToFavourite" @addToCart="addToCart" />
    </div>
  </div>
</template>
