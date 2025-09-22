import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useApi from '../services/useApi';
const AuthContext = createContext(undefined);
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate()
    const api = useApi()

    const loginAction = async ({data})=>{
        setLoading(true)
        try {
            const response = await api.post('/api/users/login', data, {
                headers: {"Content-Type": "application/json"}
            })
            const res = response.data || {}

            // Try multiple locations/names for the token
            const tokenFromHeader = (response.headers?.authorization || response.headers?.Authorization || "").replace(/^Bearer\s+/i, '')
            const tokenCandidate = res.token 
                || res.accessToken 
                || res.jwt 
                || res.data?.token 
                || res.data?.accessToken 
                || res.data?.jwt 
                || tokenFromHeader

            if(tokenCandidate){
                setToken(tokenCandidate)
                localStorage.setItem("site", tokenCandidate)
                
                const decodeUser = jwtDecode(tokenCandidate)
                setUser(decodeUser)

                setError("")
                navigate('/')
            }else{
                throw new Error(res.message || "Login falhou: token ausente na resposta")
            }
        } catch (error) {
            console.error("Login failed:", error.message);
      
            if (error.response && error.response.status) {
              switch (error.response.status) {
                case 401:
                  setError("E-mail ou senha incorreta.");
                  break;
                case 404:
                  setError("Usuário não encontrado.");
                  break;
                default:
                  setError(error.response.data?.message || "Erro ao fazer login. Tente novamente.");
              }
            } else {
              setError(error.message || "Erro de conexão. Verifique sua internet.");
            }
          }
        
    }
    useEffect(()=>{
        const storedToken = localStorage.getItem('site')
        if(storedToken){
            try {
                const decodeUser = jwtDecode(storedToken)
                setToken(storedToken)
                setUser(decodeUser)
            } catch (error) {
                console.error("Erro ao decodificar o token : ", error)
                localStorage.removeItem('site')
                setToken('')
                setUser(null)
                
            }
        }
setLoading(false)
    },[])

    const logOut = ()=>{
        setUser(null)
        setToken("")
        localStorage.removeItem('site')
        navigate('/login')

    }
    return (
        <AuthContext.Provider value={{ token, user, loginAction, logOut, error, api,  loading  }}>
    {children}
  </AuthContext.Provider>
  )
}

export default AuthProvider


export const useAuth = ()=>{
    const context = useContext(AuthContext)
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}


