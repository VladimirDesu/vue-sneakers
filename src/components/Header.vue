<script setup>

const emit = defineEmits(['toggleDrawer'])

</script>
<template>
  <header class="flex justify-between border-b border-slate-300 px-8 py-8">
    <div class="flex items-center gap-4">
      <img src="/logo.png" alt="Logo" class="w-10" />
      <div>
        <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
        <p class="text-slate-400">Магазин лучших кросовок</p>
      </div>
    </div>

    <ul class="flex items-center gap-10">
      <li class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black" @click="() => emit('toggleDrawer')">
        <img src="/cart.svg" alt="Cart" />
        <b>1205 р.</b>
      </li>

      <li class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black">
        <img src="/heart.svg" alt="Cart" />
        <b>Закладки</b>
      </li>

      <li class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black">
        <img src="/profile.svg" alt="Cart" />
        <b>Профиль</b>
      </li>
    </ul>
  </header>
</template>
