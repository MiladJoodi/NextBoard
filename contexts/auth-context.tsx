"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { type User, users } from "@/lib/data"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (email: string, password: string, name: string) => Promise<boolean>
  updateProfile: (updates: Partial<User>) => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("currentUser")
    if (stored) {
      setUser(JSON.parse(stored))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = users.find((u) => u.email === email && u.password === password)
    if (foundUser) {
      const updatedUser = { ...foundUser, lastLogin: new Date().toISOString() }
      setUser(updatedUser)
      localStorage.setItem("currentUser", JSON.stringify(updatedUser))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("currentUser")
  }

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    const exists = users.some((u) => u.email === email)
    if (exists) {
      return false
    }

    const newUser: User = {
      id: `U${Date.now()}`,
      email,
      password,
      name,
      role: "user",
      status: "online",
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    setUser(newUser)
    localStorage.setItem("currentUser", JSON.stringify(newUser))
    return true
  }

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("currentUser", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
