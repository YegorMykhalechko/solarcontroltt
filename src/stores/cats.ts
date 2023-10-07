import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast'
import { Cats, CatByBreed, CatImages } from '@/api'
import {
  generateRandomStatus,
  generateRandomStatusNotification,
  generateRandomArrayOfBirdsCount,
  generateRandomArrayOfActivityTime
} from '@/utils/catInfo'
import type { ICat, INotification } from '@/models/interface'

export const useCatsStore = defineStore('cats', () => {
  const toast = useToast()
  const cats = ref<ICat[]>([])
  const catsBreed = ref([])
  const cat = ref<ICat | null>(null)
  const catStatus = ref<string | null>(null)
  const catNotifications = ref<INotification[]>([])
  const catBirdsCount = ref<number[]>([])
  const catActivityTime = ref<number[]>([])

  async function getCatsBreed() {
    try {
      const cats = await Cats()
      catsBreed.value = cats.data.map((cat: ICat) => {
        return {
          value: cat.id,
          name: cat.name
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  function createCat(catData: ICat) {
    cats.value = JSON.parse(localStorage.getItem('cats') || '[]')

    const userExists = cats.value.some((cat: ICat) => cat.petName === catData.petName)
    if (userExists) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'A cat with this name already exists',
        life: 3000
      })
    } else {
      cats.value.push(catData)
      localStorage.setItem('cats', JSON.stringify(cats.value))
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Cat was successfully added',
        life: 3000
      })
    }
  }

  async function getCats() {
    try {
      if (localStorage['cats']) {
        cats.value = JSON.parse(localStorage.getItem('cats') || '[]')
        const promises = cats.value.map(async (cat, index) => {
          const resInfo = await CatByBreed(cat.breed)
          const resImage = await CatImages(cat.breed)
          cats.value[index] = { ...cat, ...resInfo.data, ...resImage.data[0] }
        })

        await Promise.all(promises)
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function getCat(catData: unknown, limit = 0) {
    try {
      const currentCat = JSON.parse(localStorage.getItem('cats') || '[]').find(
        (cat: ICat) => cat.petName === catData
      )
      const resInfo = await CatByBreed(currentCat.breed)
      const resImage = await CatImages(currentCat.breed, limit)

      cat.value = { ...currentCat, ...resInfo.data, images: [...resImage.data] }
    } catch (err) {
      console.log(err)
    }
  }

  function getCatStatus() {
    catStatus.value = generateRandomStatus()
  }

  function getCatNotification() {
    for (let i = 0; i < 10; i++) {
      const notification = generateRandomStatusNotification()
      catNotifications.value.push(notification)
    }
  }

  function getCatActivityTime() {
    catBirdsCount.value = generateRandomArrayOfBirdsCount()
  }

  function getCatBirdCount() {
    catActivityTime.value = generateRandomArrayOfActivityTime()
  }

  return {
    catsBreed,
    getCatsBreed,
    createCat,
    cats,
    getCats,
    getCat,
    cat,
    catStatus,
    getCatStatus,
    getCatNotification,
    catNotifications,
    catBirdsCount,
    catActivityTime,
    getCatActivityTime,
    getCatBirdCount
  }
})
