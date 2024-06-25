<template>
  <q-page padding>
    <q-card class="register-card">
      <q-card-section>
        <q-form @submit.prevent="handleRegister" class="register-form">
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
              @click="handleLogin"
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
import axios from 'axios'
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
    const handleRegister = async () => {
      if (registerData.value.senha !== confirmPassword.value) {
        alert('As senhas não são iguais. Tente novamente.')
        return
      }
      isLoading.value = true
      try {
        const response = await axios.post('http://50.16.160.89:8080/auth/registrar', registerData.value)
        if (response.status === 201 || response.status === 200) {
          alert('Cadastro realizado com sucesso!')
          router.push('/entrar')
        } else {
          alert('Ocorreu um erro durante o cadastro. Tente novamente.')
        }
      } catch (error) {
        console.error('Erro ao cadastrar:', error)
        alert('Ocorreu um erro durante o cadastro. Tente novamente.')
      } finally {
        isLoading.value = false
      }
    }
    const handleLogin = () => {
      router.push('/entrar')
    }
    return {
      registerData,
      confirmPassword,
      isLoading,
      handleRegister,
      handleLogin
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
