import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { axios, setGlobalToken } from '@/api/axios'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const token = ref('')
  
  const router = useRouter()
  
  const storageToken = localStorage.getItem('le_token')
  if (storageToken) {
    axios.get('/auth/me', { headers: { Authorization: `Bearer ${storageToken}`}})
        .then(() => {
            // le token est valide
            setGlobalToken(storageToken)
            // router.push('/game') ALLER VERS LE JEU
        })
        .catch(_err => {
            // le token n'est pas valide
            // router.push('/login') ALLER VERS LE LOGIN
        })
  }
  
  const tryLogin = (username: string, password: string) => {
    axios.post('/auth/login', { username, password })
        .then((res) => {
            if (res.data.token) {
                localStorage.setItem('le_token', res.data.token)
                setGlobalToken(storageToken)
                // router.push('/game') ALLER VERS LE JEU
            } else {
                // router.push('/login') ALLER VERS LE LOGIN
            }
        })
  }
  
  return { token, tryLogin }
})
