<script setup lang="ts">
import { useForm } from 'vee-validate'
import { useRegisterUsersStore } from '@/stores/registerUsers'
import * as yup from 'yup'
import Card from 'primevue/card'

import type { IUserRegister } from '@/models/interface'

const usersStore = useRegisterUsersStore()

const { errors, handleSubmit, defineInputBinds, resetForm } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('password')])
  })
})

const email = defineInputBinds('email')
const password = defineInputBinds('password')
const confirmPassword = defineInputBinds('confirmPassword')

const onSubmit = handleSubmit((values: IUserRegister) => {
  usersStore.registerUser(values)
  resetForm()
})
</script>

<template>
  <div class="container-center">
    <Card class="w-9 md:w-7 lg:w-5">
      <template #title>Register</template>
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

          <div>
            <InputText
              class="w-full"
              :class="{ 'p-invalid': errors.confirmPassword }"
              placeholder="Confirm Password"
              v-bind="confirmPassword"
              type="password"
            />
            <small class="p-error" id="text-error">{{ errors.confirmPassword }}</small>
          </div>

          <MyButton type="submit" label="Register" />
        </form>
      </template>
    </Card>
  </div>
</template>
