import { env } from "@/env"
import axios from "axios"

export const api = axios.create({
  baseURL: env.API_BASE_URL + "/api",
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token || ""}`
  return config
})

api.interceptors.response.use(
  (response) => {
    console.log(response)
    return response
  },
  (error) => {
    const { response } = error
    if (response.status === 401) {
      localStorage.removeItem("token")
      window.location.reload()
    } else if (response.status === 404) {
      //Show not found
    }

    throw error
  }
)
