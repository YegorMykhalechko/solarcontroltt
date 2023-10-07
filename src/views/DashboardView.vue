<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import Card from 'primevue/card'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import Message from 'primevue/message'

import { useForm } from 'vee-validate'
import * as yup from 'yup'

import { useCatsStore } from '@/stores/cats'

import type { ICat } from '@/models/interface'

let breeds: string[] = []
const catsStore = useCatsStore()

onMounted(async () => {
  await catsStore.getCatsBreed()
  await catsStore.getCats()
  breeds = catsStore.catsBreed
})

const visible = ref(false)

const router = useRouter()

const { errors, handleSubmit, defineComponentBinds, resetForm } = useForm({
  validationSchema: yup.object({
    petName: yup.string().required(),
    breed: yup.string().required(),
    color: yup.string().required()
  })
})

const petName = defineComponentBinds('petName')
const breed = defineComponentBinds('breed')
const color = defineComponentBinds('color')

const onSubmit = handleSubmit((values: ICat) => {
  catsStore.createCat(values)
  catsStore.getCats()
  visible.value = false
  resetForm()
})

const navigateToCatPage = (name: string | undefined) => {
  router.push(`/dashboard/${name}`)
}
</script>

<template>
  <div class="wrapper">
    <div class="flex justify-content-end">
      <MyButton type="submit" label="Create Cat" @click="visible = true" />
    </div>
    <div v-if="catsStore.cats.length" class="mt-3 grid">
      <div v-for="cat of catsStore.cats" :key="cat.petName" class="col">
        <Card class="card">
          <template #header>
            <img class="image" :alt="`cat-${cat.name}`" :src="cat.url" />
          </template>
          <template #title> {{ cat.petName }} </template>
          <template #subtitle> {{ cat.name }} </template>
          <template #content>
            <p>
              {{ cat.description }}
            </p>
          </template>
          <template #footer>
            <MyButton @click="navigateToCatPage(cat.petName)" label="Look" />
          </template>
        </Card>
      </div>
    </div>
    <Message v-else severity="error">Cats Not Found!</Message>
  </div>
  <Dialog
    v-model:visible="visible"
    modal
    header="Create Cat"
    :style="{ width: '40vw' }"
    :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
  >
    <form @submit="onSubmit" class="flex flex-column gap-3">
      <div>
        <InputText
          class="w-full"
          :class="{ 'p-invalid': errors.petName }"
          placeholder="Name"
          v-bind="petName"
          type="text"
        />
        <small class="p-error" id="text-error">{{ errors.petName }}</small>
      </div>

      <div>
        <InputText
          class="w-full"
          :class="{ 'p-invalid': errors.color }"
          placeholder="Color"
          v-bind="color"
          type="text"
        />
        <small class="p-error" id="text-error">{{ errors.color }}</small>
      </div>

      <div>
        <Dropdown
          placeholder="Select a Breed"
          editable
          class="w-full"
          v-bind="breed"
          :options="breeds"
          optionLabel="name"
          optionValue="value"
          :class="{ 'p-invalid': errors.breed }"
        />
        <small class="p-error" id="text-error">{{ errors.breed }}</small>
      </div>

      <MyButton type="submit" label="Create" />
    </form>
  </Dialog>
</template>
<style scoped>
.image {
  width: 100%;
  height: auto;
}

.card {
  max-width: 450px;
}
</style>
