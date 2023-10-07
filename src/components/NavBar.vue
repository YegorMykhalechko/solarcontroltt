<script setup lang="ts">
import Menubar from 'primevue/menubar'
import Menu from 'primevue/menu'
import TieredMenu from 'primevue/tieredmenu'
import Avatar from 'primevue/avatar'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import { useLoginUserStore } from '@/stores/loginUser'
import { useCatsStore } from '@/stores/cats'
import { ref, onMounted, nextTick } from 'vue'
import type { INotification, INotificationBell } from '@/models/interface'

const userStore = useLoginUserStore()
const catsStore = useCatsStore()
const confirm = useConfirm()
const toast = useToast()

const itemsBell = ref<INotificationBell[]>([])
onMounted(async () => {
  await nextTick()
  itemsBell.value = catsStore.catNotifications.map((el) => {
    return {
      label: `${el.status}:${el.time}`,
      command: () => {
        createNotification(el)
      }
    }
  })
})

const menuItems = ref([
  {
    label: 'Login',
    to: '/'
  },
  {
    label: 'Register',
    to: '/register'
  }
])

const menu = ref()
const menuBell = ref()

const items = ref([
  { separator: true },
  {
    label: 'Dashboard',
    icon: 'pi pi-fw pi-user',
    to: '/dashboard'
  },
  {
    separator: true
  },
  {
    label: 'Log Out',
    icon: 'pi pi-sign-out',
    command: () => {
      confirmLogout(event)
    }
  }
])

const toggle = (event: Event) => {
  menu.value.toggle(event)
}

const toggleBell = (event: Event) => {
  menuBell.value.toggle(event)
}

const confirmLogout = (event: Event) => {
  confirm.require({
    target: event.currentTarget as HTMLButtonElement,
    message: 'Are you sure you want to proceed?',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: () => {
      userStore.logoutUser()
    },
    reject: () => {
      return
    }
  })
}

const createNotification = (data: INotification) => {
  toast.add({
    severity: 'success',
    summary: data.status,
    detail: data.time,
    life: 3000
  })
}
</script>

<template>
  <Menubar class="border-none justify-content-end h-4rem" :model="!userStore.user ? menuItems : []">
    <template #start v-if="userStore.user">
      <MyButton
        type="button"
        @click="toggleBell"
        label="History"
        icon="pi pi-bell"
        :badge="catsStore.catStatus"
        badgeClass="p-badge-danger" />
      <Menu ref="menuBell" :model="itemsBell" :popup="true"
    /></template>
    <template #end v-if="userStore.user">
      <button
        @click="toggle"
        class="w-full p-link flex align-items-center p-2 pl-3 text-color hover:surface-200 border-noround"
      >
        <Avatar
          image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
          class="mr-2"
          shape="circle"
        />
        <div class="flex flex-column align">
          <span class="font-bold">{{ userStore.user }}</span>
        </div>
      </button>
      <TieredMenu ref="menu" :popup="true" :model="items" />
    </template>
  </Menubar>
</template>

<style scoped></style>
