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
                headers: { "Content-Type": "application/json" }
            })
            const res = response.data
            if(res.token){
                setToken(res.token)
                localStorage.setItem("site", res.token)
                
                const decodeUser = jwtDecode(res.token)
                setUser(decodeUser)

                setError("")
                navigate('/')
            }else{
                throw new Error(res.message||  "Login falhou")
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
                  setError("Erro ao fazer login. Tente novamente.");
              }
            } else {
              setError("Erro de conexão. Verifique sua internet.");
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