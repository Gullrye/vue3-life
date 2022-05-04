import axios from 'axios'

const $http = axios.create({
  baseURL: 'http://localhost:3001/api'
})

$http.interceptors.response.use((res) => {
  if (res.status == 200) {
    return res.data
  }
})

export { $http }
