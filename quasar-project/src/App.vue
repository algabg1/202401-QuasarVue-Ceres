<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { setupAuth } from './auth'

defineOptions({
  name: 'App'
})

onMounted(() => {
  setupAuth()
})
</script>
