import RegisterModel from '../register-model/RegisterModel'

export default {
  async handleRegister (registerData, confirmPassword, router, setIsLoading) {
    if (registerData.senha !== confirmPassword) {
      alert('As senhas não são iguais. Tente novamente.')
      return
    }
    setIsLoading(true)
    try {
      const response = await RegisterModel.registerUser(registerData)
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
      setIsLoading(false)
    }
  },
  handleLogin (router) {
    router.push('/entrar')
  }
}
