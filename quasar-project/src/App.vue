<template>
  <router-view />
</template>

<script setup>
// eslint-disable-next-line import/no-duplicates
import { onMounted } from 'vue'
import { setupAuth } from './auth'
// eslint-disable-next-line import/no-duplicates
import { createApp } from 'vue'
import { Quasar } from 'quasar'
import { createPinia } from 'pinia'
import App from './App.vue'
defineOptions({
  name: 'App'
})

const app = createApp(App)
app.use(Quasar)
app.use(createPinia())
app.mount('#app')
onMounted(() => {
  setupAuth()
})

</script>
