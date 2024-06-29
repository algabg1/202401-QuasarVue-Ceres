import axios from 'axios'

export default {
  async registerUser (registerData) {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.post('{API_BASE_URL}:8080/auth/registrar', registerData)
      return response
    } catch (error) {
      throw error
    }
  }
}
