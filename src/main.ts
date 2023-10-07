import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import App from './App.vue'
import router from './router'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Toast from 'primevue/toast'
import Password from 'primevue/password'

import '@/assets/main.css'
import 'primevue/resources/themes/lara-light-teal/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.use(ConfirmationService)
app.component('MyButton', Button)
app.component('InputText', InputText)
app.component('MyToast', Toast)
app.component('MyPassword', Password)

app.mount('#app')
