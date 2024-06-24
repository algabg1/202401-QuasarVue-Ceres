<template>
  <div class="fullscreen bg-gradient text-white text-center q-pa-md flex flex-center">
    <div class="content-wrapper">
      <div class="error-code">404</div>
      <div class="error-message">Opa! Página não encontrada</div>
      <div class="error-description q-mt-md">
        Parece que você se perdeu no nosso jardim virtual...
      </div>
      <div class="plant-animation q-my-lg">
        🌱
      </div>
      <q-btn
        class="q-mt-xl go-home-btn"
        color="green-7"
        text-color="white"
        unelevated
        to="/"
        label="Voltar para o início"
        no-caps
        icon="home"
      />
    </div>
  </div>
</template>

<script setup>
import { defineOptions } from 'vue'

defineOptions({
  name: 'ErrorNotFound'
})
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, #7cc5d9, #8e8fd3);
}

.content-wrapper {
  max-width: 600px;
}

.error-code {
  font-size: 15vh;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 4px 4px 0px rgba(0, 0, 0, 0.1);
}

.error-message {
  font-size: 3rem;
  font-weight: 300;
  margin-top: -20px;
}

.error-description {
  font-size: 1.2rem;
  opacity: 0.7;
}

.plant-animation {
  font-size: 5rem;
  animation: grow 2s ease-in-out infinite alternate;
}

.go-home-btn {
  font-size: 1.2rem;
  padding: 12px 24px;
  border-radius: 30px;
  transition: transform 0.3s ease;
}

.go-home-btn:hover {
  transform: scale(1.05);
}

@keyframes grow {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
}
</style>
