import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import type { IUser, IUserRegister } from '@/models/interface'

export const useRegisterUsersStore = defineStore('users', () => {
  const toast = useToast()
  const router = useRouter()
  const users = ref<IUser[]>([])
  function registerUser(userData: IUserRegister) {
    users.value = JSON.parse(localStorage.getItem('users') || '[]')

    const userExists = users.value.some((user) => user.email === userData.email)
    if (userExists) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'A user with this email already exists',
        life: 3000
      })
    } else {
      users.value.push(userData)
      localStorage.setItem('users', JSON.stringify(users.value))
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'User was successfully added',
        life: 3000
      })
      router.push('/')
    }
  }

  return { users, registerUser }
})
