<template>
  <q-page padding>
    <q-card class="login-card">
      <q-card-section>
        <q-form @submit.prevent="handleSubmit" class="login-form">
          <q-input
            outlined
            v-model="loginData.email"
            label="E-mail"
            type="email"
            placeholder="Digite seu e-mail"
            class="login-input"
          />
          <q-input
            outlined
            v-model="loginData.senha"
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            class="login-input"
          />
          <q-btn
            type="submit"
            label="Login"
            color="primary"
            class="login-btn"
            :loading="isLoading"
          />
          <q-space />
          <q-card-actions align="center">
            <q-btn
              flat
              color="primary"
              label="Recuperar Conta"
              @click="handleRecoverAccount"
            />
          </q-card-actions>
          <q-card-actions align="center">
            <q-btn
              flat
              color="primary"
              label="Cadastrar Conta"
              @click="handleCreateAccount"
            />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import axios from 'axios'

const $q = useQuasar()
const router = useRouter()
const loginData = ref({
  email: '',
  senha: ''
})
const isLoading = ref(false)

async function handleSubmit () {
  try {
    isLoading.value = true
    const response = await axios.post('http://54.161.154.3:8080/auth/login', loginData.value)
    if (response.data && response.data.token) {
      localStorage.setItem('userToken', response.data.token)
      localStorage.setItem('userData', JSON.stringify(response.data.usuario))
      // alert(localStorage.getItem('userData'))
      $q.notify({
        color: 'positive',
        message: 'Login realizado com sucesso!',
        icon: 'check'
      })

      // Redireciona para a página de perfil
      await router.push('/profile')

      // Atualiza a página após um breve delay
      setTimeout(() => {
        window.location.reload()
      }, 100)
    } else {
      throw new Error('Token não recebido')
    }
  } catch (error) {
    console.error('Erro ao autenticar:', error)
    $q.notify({
      color: 'negative',
      message: 'Falha na autenticação. Verifique suas credenciais.',
      icon: 'warning'
    })
  } finally {
    isLoading.value = false
  }
}

function handleRecoverAccount () {
  console.log('Recuperar Conta clicado')
  // Implemente a lógica de recuperação de conta aqui
}

function handleCreateAccount () {
  // Lógica para criar uma nova conta
  console.log('Cadastrar Conta clicado')
  router.push('/cadastrar')
}
</script>

<style scoped>
.login-card {
  max-width: 400px;
  margin: auto;
}
.login-input {
  margin-bottom: 20px;
}
.login-btn {
  width: 100%;
}
</style>
