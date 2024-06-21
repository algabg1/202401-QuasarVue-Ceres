<script>
import UserModel from '../user-model'

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
        this.isLoading = true
        const user = await UserModel.authenticate(
          this.loginData.username,
          this.loginData.password
        )

        if (user) {
          // Login bem-sucedido
          alert('Login bem-sucedido!')
          // Você pode redirecionar o usuário para a página desejada aqui
          // this.$router.push('/dashboard');
        } else if (user === undefined) {
          // Usuário não encontrado
          alert('Usuário não encontrado. Por favor, verifique o login.')
        } else {
          // Senha incorreta
          alert('Senha incorreta. Por favor, tente novamente.')
        }
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
</style>
