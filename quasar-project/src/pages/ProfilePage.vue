<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div v-if="user">
          <h2>Bem-vindo, {{ user.nome }}!</h2>
          <q-separator />
          <div v-if="user.user_role === 'ADMIN'">
            <h3>Painel de Administrador</h3>
            <p>Você possui permissões de administrador.</p>
            <!-- Adicione aqui mais conteúdo específico para administradores -->
          </div>
          <div v-else>
            <h3>Painel de Usuário</h3>
            <p>Bem-vindo ao seu painel de usuário.</p>
            <!-- Adicione aqui mais conteúdo específico para usuários -->
          </div>
        </div>
        <q-btn @click="handleLogout" color="primary" label="Sair" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const user = ref(null)
const router = useRouter()

onMounted(() => {
  const userData = localStorage.getItem('userData')
  if (!userData) {
    router.push('/login')
  } else {
    user.value = JSON.parse(userData)
  }
})

function handleLogout () {
  localStorage.removeItem('userToken')
  localStorage.removeItem('userData')
  router.push('/home')
}
</script>

<style scoped>
h2, h3 {
  margin: 0;
  padding: 10px 0;
}
</style>
