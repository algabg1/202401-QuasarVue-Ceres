<template>
  <q-page padding>
    <q-card class="register-card">
      <q-card-section>
        <q-form @submit.prevent="handleRegister" class="register-form">
          <q-input
            outlined
            v-model="registerData.name"
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
            v-model="registerData.password"
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            class="register-input"
          />
          <q-input
            outlined
            v-model="registerData.confirmPassword"
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
import axios from 'axios'

export default {
  data () {
    return {
      registerData: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      isLoading: false
    }
  },
  methods: {
    async handleRegister () {
      // Verificar se as senhas são iguais
      if (this.registerData.password !== this.registerData.confirmPassword) {
        alert('As senhas não são iguais. Tente novamente.')
        return
      }

      this.isLoading = true

      try {
        // Criar um objeto com os dados da nova pessoa
        const newPerson = {
          nome: this.registerData.name,
          email: this.registerData.email,
          senha: this.registerData.password
        }

        // Fazer a requisição POST para cadastrar a nova pessoa
        const response = await axios.post('/api/v1/pessoas', newPerson)

        // Verificar se o cadastro foi bem-sucedido
        if (response.status === 201 || response.status === 200) {
          alert('Cadastro realizado com sucesso!')
          // Redirecionar para a página de login após o cadastro
          this.$router.push('/entrar')
        } else {
          alert('Ocorreu um erro durante o cadastro. Tente novamente.')
        }
      } catch (error) {
        console.error('Erro ao cadastrar:', error)
        alert('Ocorreu um erro durante o cadastro. Tente novamente.')
      } finally {
        this.isLoading = false
      }
    },
    handleLogin () {
      // Redirecionar para a página de login
      this.$router.push('/entrar')
    }
  }
}
</script>

<style scoped>
/* Estilos específicos para este componente */
.register-card {
  max-width: 400px; /* Define a largura máxima do card */
  margin: 0 auto; /* Centraliza o card na tela */
}
.register-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.register-input {
  max-width: 300px; /* Define a largura máxima dos inputs */
}
.register-btn {
  margin-top: 20px; /* Espaçamento acima do botão de cadastro */
  transition: transform 0.2s ease-in-out;
}
.register-btn:active {
  transform: scale(0.95);
}
</style>
