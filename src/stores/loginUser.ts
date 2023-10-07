import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import type { IUser } from '@/models/interface'

export const useLoginUserStore = defineStore('user', () => {
  const toast = useToast()
  const user = ref<IUser | null>(null)
  const router = useRouter()

  function loginUser(userData: IUser) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')

    const userExists = users.some(
      (u: IUser) => u.email === userData.email && u.password === userData.password
    )

    if (userExists) {
      user.value = userData
      localStorage.setItem('user', JSON.stringify(userData.email))
      router.push('/dashboard')
    } else {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'User with this email or password is incorrect',
        life: 3000
      })
    }
  }

  function getUser() {
    if (localStorage['user']) {
      user.value = JSON.parse(localStorage.getItem('user') || '')
    }
  }

  function logoutUser() {
    user.value = null
    localStorage.removeItem('user')
    router.push('/')
  }

  return { user, loginUser, getUser, logoutUser }
})
