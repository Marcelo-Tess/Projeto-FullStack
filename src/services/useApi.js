import React from 'react'
import axios from 'axios'

// Factory that returns a pre-configured axios instance without importing React context
const useApi = () => {
    const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL || '', // Se não tiver VITE_API_URL, usa URL relativa (proxy)
        headers: {
            "Content-Type": "application/json"
        }
    })

    api.interceptors.request.use((config) => {
        const token = localStorage.getItem('site')
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    })

    return api
}

export default useApi