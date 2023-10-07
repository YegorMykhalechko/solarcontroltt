<script setup lang="ts">
import Card from 'primevue/card'
import { useForm } from 'vee-validate'
import { useLoginUserStore } from '@/stores/loginUser'
import * as yup from 'yup'

import type { IUser } from '@/models/interface'

const userStore = useLoginUserStore()

const { errors, handleSubmit, defineInputBinds, resetForm } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
  })
})

const email = defineInputBinds('email')
const password = defineInputBinds('password')

const onSubmit = handleSubmit((values: IUser) => {
  userStore.loginUser(values)
  resetForm()
})
</script>

<template>
  <div class="container-center">
    <Card class="w-9 md:w-7 lg:w-5">
      <template #title>Login</template>
      <template #content>
        <form @submit="onSubmit" class="flex flex-column gap-3">
          <div>
            <InputText
              class="w-full"
              :class="{ 'p-invalid': errors.email }"
              placeholder="Email"
              v-bind="email"
              type="text"
            />
            <small class="p-error" id="text-error">{{ errors.email }}</small>
          </div>

          <div>
            <InputText
              class="w-full"
              :class="{ 'p-invalid': errors.password }"
              placeholder="Password"
              v-bind="password"
              type="password"
            />
            <small class="p-error" id="text-error">{{ errors.password }}</small>
          </div>

          <MyButton type="submit" label="Login" />
        </form>
      </template>
    </Card>
  </div>
</template>
