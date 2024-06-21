// User.js
import axios from 'axios'

export default {
  async getUsers () {
    try {
      const response = await axios.get('/api/v1/users')
      return response.data.data
    } catch (error) {
      console.error('Erro ao obter usuários:', error)
      throw error
    }
  },

  async authenticate (username, password) {
    try {
      const userData = await this.getUsers()
      const user = userData.find(
        (u) => u.login === username && u.senha === password
      )
      return user
    } catch (error) {
      console.error('Erro ao autenticar:', error)
      throw error
    }
  }
}
