import { createContext, useContext, useEffect, useState } from 'react'
import API from '../services/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user')) || null
  })

  const [loading, setLoading] = useState(false)

  const register = async (formData) => {
    setLoading(true)
    try {
      const { data } = await API.post('/auth/register', formData)
      setUser(data)
      localStorage.setItem('user', JSON.stringify(data))
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
      }
    } finally {
      setLoading(false)
    }
  }

  const login = async (formData) => {
    setLoading(true)
    try {
      const { data } = await API.post('/auth/login', formData)
      setUser(data)
      localStorage.setItem('user', JSON.stringify(data))
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const getProfile = async () => {
    try {
      const { data } = await API.get('/auth/profile')
      return data
    } catch (error) {
      return null
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, logout, getProfile }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
