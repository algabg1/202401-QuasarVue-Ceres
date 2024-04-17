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
        // Exibir uma mensagem de erro
        alert('As senhas não são iguais. Tente novamente.')
        return
      }

      // Lógica de registro da nova conta
      console.log('Nome:', this.registerData.name)
      console.log('E-mail:', this.registerData.email)
      console.log('Senha:', this.registerData.password)
      this.isLoading = true

      // Exemplo: simulando uma requisição assíncrona para realizar o registro
      setTimeout(() => {
        this.isLoading = false
        // Redirecionar para a página de login após o registro
        this.$router.push('/entrar')
      }, 1500)
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
