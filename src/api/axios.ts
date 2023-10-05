import Axios from 'axios'

export const axios = Axios.create({
    baseURL: 'http://localhost:3001'
})

export function setGlobalToken(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
}
