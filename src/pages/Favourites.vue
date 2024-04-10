<script setup>
import { ref, inject, onMounted } from 'vue'
import axios from 'axios'

import CardList from '../components/CardList.vue'
import InfoBox from '../components/InfoBox.vue'

const url = inject('url')
const addToFavourite = inject('addToFavourite')
const { cart, addToCart, removeFromCart } = inject('cart')

const favourites = ref([])

const fetchFavourites = async () => {
  try {
    const { data } = await axios.get(`${url.favourites}?_relations=sneakers`)
    favourites.value = data.map((item) => ({
      ...item.sneaker,
      isFavourite: true,
      favouriteId: item.id
    }))
    return data
  } catch (err) {
    console.log(err)
  }
}

const onClickPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const deleteFavourite = (item) => {
  addToFavourite(item)
  favourites.value.splice(favourites.value.indexOf(item), 1)
}

onMounted(async () => {
  await fetchFavourites()
  favourites.value = favourites.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})
</script>

<template>
  <div v-if="favourites.length == 0" class="py-40 w-96 mx-auto">
    <InfoBox
      title="Закладок нет :("
      imageUrl="/emoji-1.png"
      description="Вы ничего не добавляли в закладки"
    />
    <RouterLink :to="{ name: 'Home' }">
      <button
        class="mx-auto mt-4 relative transition bg-lime-500 w-full rounded-xl py-3 text-white disabled:bg-slate-300 hover:bg-lime-600 active:bg-lime-700"
      >
        <img class="absolute top-2/4 left-4 rotate-180 -translate-y-2/4" src="/arrow-next.svg" />
        Вернуться назад
      </button>
    </RouterLink>
  </div>
  <div v-else>
    <h2 class="mb-8 text-3xl font-bold">Мои закладки</h2>

    <CardList :items="favourites" @addToFavourite="deleteFavourite" @addToCart="onClickPlus" />
  </div>
</template>
