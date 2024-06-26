<script setup>
import { ref, computed, inject } from 'vue'
import axios from 'axios'

import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
import InfoBox from './InfoBox.vue'

const url = inject('url')

const {cart} = inject('cart')

const {totalPrice} = defineProps({
  totalPrice: Number
})

const emit = defineEmits(['toggleDrawer'])

const isCreatingOrder = ref(false)
const orderId = ref(null)

const buttonDisabled = computed(() =>
  totalPrice ? (isCreatingOrder.value ? true : false) : true
)

const vatPrice = computed(() => Math.round(totalPrice * 0.05))

const createOrder = async () => {
  isCreatingOrder.value = true
  try {
    const { data } = await axios.post(url.orders, {
      items: cart.value,
      totalPrice
    })
    cart.value = []

    orderId.value = data.id
    return data
  } catch (err) {
    console.log(err)
  } finally {
    isCreatingOrder.value = false
  }
}
</script>

<template>
  <div
    @click="() => emit('toggleDrawer')"
    class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"
  ></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <DrawerHead />

    <div v-if="!totalPrice || orderId" class="flex h-full justify-center">
      <InfoBox
        v-if="!totalPrice && !orderId"
        title="Корзина пустая"
        description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"
        imageUrl="/package-icon.png"
      />
      <InfoBox
        v-if="orderId"
        title="Заказ оформлен!"
        :description="`Ваш заказ #${orderId} скоро будет передан курьерской доставке`"
        imageUrl="/order-success-icon.png"
        :isSuccess="true"
      />
    </div>

    <div v-else>
      <CartItemList />

      <div class="flex flex-col gap-4 mb-4">
        <div class="flex gap-2">
          <span>Итого:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ totalPrice }} руб.</b>
        </div>

        <div class="flex gap-2">
          <span>Налог 5%:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ vatPrice }} руб.</b>
        </div>

        <button
          :disabled="buttonDisabled"
          @click="createOrder"
          class="mt-7 transition bg-lime-500 w-full rounded-xl py-3 text-white disabled:bg-slate-300 hover:bg-lime-600 active:bg-lime-700"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>
