<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import { onMounted } from 'vue'
import { useLoginUserStore } from './stores/loginUser'
import { useCatsStore } from '@/stores/cats'
import ConfirmPopup from 'primevue/confirmpopup'

const userStore = useLoginUserStore()
const catsStore = useCatsStore()
onMounted(() => {
  userStore.getUser()
  if (userStore.user) {
    catsStore.getCats()
    catsStore.getCatStatus()
    catsStore.getCatNotification()
    catsStore.getCatActivityTime()
    catsStore.getCatBirdCount()
  }
})
</script>

<template>
  <header>
    <NavBar />
  </header>
  <main>
    <RouterView />
  </main>
  <MyToast />
  <ConfirmPopup></ConfirmPopup>
</template>

<style scoped></style>
