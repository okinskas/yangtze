import axios from 'axios'

function getAxiosInstance() {
  return axios.create({
    baseURL: process.env.VUE_APP_API_BASE,
    headers: { 'Content-Type': 'application/json' }
  })
}

export { getAxiosInstance as default }
