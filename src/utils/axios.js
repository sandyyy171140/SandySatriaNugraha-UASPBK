import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000', // pastikan json-server jalan di sini
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
