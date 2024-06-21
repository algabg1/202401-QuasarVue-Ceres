<template>
  <q-page padding>
    <q-card class="register-card">
      <q-card-section>
        <q-form @submit.prevent="onRegister" class="register-form">
          <q-input
            outlined
            v-model="registerData.nome"
            label="Nome"
            placeholder="Digite seu nome"
            class="register-input"
          />
          <q-input
            outlined
            v-model="registerData.email"
            label="E-mail"
            type="email"
            placeholder="Digite seu e-mail"
            class="register-input"
          />
          <q-input
            outlined
            v-model="registerData.senha"
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            class="register-input"
          />
          <q-input
            outlined
            v-model="confirmPassword"
            label="Confirmar Senha"
            type="password"
            placeholder="Confirme sua senha"
            class="register-input"
          />
          <q-btn
            type="submit"
            label="Cadastrar"
            color="primary"
            class="register-btn"
            :loading="isLoading"
          />
          <q-space />
          <q-card-actions align="center">
            <q-btn
              flat
              color="primary"
              label="Voltar para o Login"
              @click="onLogin"
            />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import RegisterController from '../register-controller/RegisterController'

export default {
  setup () {
    const router = useRouter()
    const registerData = ref({
      nome: '',
      email: '',
      senha: ''
    })
    const confirmPassword = ref('')
    const isLoading = ref(false)

    const setIsLoading = (loading) => {
      isLoading.value = loading
    }

    const onRegister = () => {
      RegisterController.handleRegister(registerData.value, confirmPassword.value, router, setIsLoading)
    }

    const onLogin = () => {
      RegisterController.handleLogin(router)
    }

    return {
      registerData,
      confirmPassword,
      isLoading,
      onRegister,
      onLogin
    }
  }
}
</script>

<style scoped>
.register-card {
  max-width: 400px;
  margin: 0 auto;
}
.register-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.register-input {
  max-width: 300px;
  margin-bottom: 15px;
}
.register-btn {
  margin-top: 20px;
  transition: transform 0.2s ease-in-out;
}
.register-btn:active {
  transform: scale(0.95);
}
</style>
