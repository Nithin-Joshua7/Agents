import axios from "axios"

const instance = axios.create({
  baseURL: "https://agents-server-58uf.onrender.com/api", // Auto-proxies to your backend if Vite is set up
  withCredentials: true, // optional, only if you're using cookies
})

// Add a request interceptor (e.g., to attach token)
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default instance
