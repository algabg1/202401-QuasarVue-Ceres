// src/utils/auth.js
import axios from 'axios'
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

export const token = ref(localStorage.getItem('userToken') || null)

export function setupAuth () {
  const router = useRouter()

  watchEffect(() => {
    if (token.value) {
      // eslint-disable-next-line dot-notation
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
    } else {
      // eslint-disable-next-line dot-notation
      delete axios.defaults.headers.common['Authorization']
    }
  })

  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        token.value = null
        localStorage.removeItem('userToken')
        router.push('/login')
      }
      return Promise.reject(error)
    }
  )
}

export function setToken (newToken) {
  token.value = newToken
  localStorage.setItem('userToken', newToken)
}

export function clearToken () {
  token.value = null
  localStorage.removeItem('userToken')
}
