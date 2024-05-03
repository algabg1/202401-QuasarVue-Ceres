<template>
  <q-page padding>
    <q-card class="login-card">
      <q-card-section>
        <q-form @submit.prevent="handleSubmit" class="login-form">
          <q-input
            outlined
            v-model="loginData.username"
            label="Login"
            placeholder="Digite seu login"
            class="login-input"
          />
          <q-input
            outlined
            v-model="loginData.password"
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

<script>
import axios from 'axios'
export default {
  data () {
    return {
      loginData: {
        username: '',
        password: ''
      },
      isLoading: false
    }
  },
  methods: {

    async handleSubmit () {
      try {
        // Lógica de autenticação aqui
        alert(this.loginData.username)
        this.isLoading = true

        // Fazendo a chamada GET para o endpoint do proxy
        const response = await axios.get('/api/v1/user/2')

        // Exibindo a resposta no console (substitua isso pela sua lógica de manipulação de dados)
        console.log(response.data)
      } catch (error) {
        console.error('Erro ao autenticar:', error)
        alert('Ocorreu um erro ao autenticar. Por favor, tente novamente.')
      } finally {
        this.isLoading = false
      }
    },
    handleRecoverAccount () {
      // Lógica para recuperar a conta
      console.log('Recuperar Conta clicado')
      // Implemente a lógica de recuperação de conta aqui
    },
    handleCreateAccount () {
      // Lógica para criar uma nova conta
      console.log('Cadastrar Conta clicado')
      this.$router.push('/cadastrar')
      // Implemente a lógica de criação de conta aqui
    }
  }
}
</script>

 <style scoped>
 /* Estilos específicos para este componente */
 .login-card {
  max-width: 400px; /* Define a largura máxima do card */
  margin: 0 auto; /* Centraliza o card na tela */
 }
 .login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
 }
 .login-input {
  max-width: 300px; /* Define a largura máxima dos inputs */
 }
 .login-password {
  margin-top: 20px; /* Adicionando margem superior ao campo de senha */
 }
 .login-btn {
  margin-top: 20px; /* Espaçamento acima do botão de login */
  transition: transform 0.2s ease-in-out;
}

.login-btn:active {
  transform: scale(0.95);
}
 </style>
