import React from "react"
import './App.scss'
import Navbar from "./components/Navbar/Navbar"
import {BrowserRouter, Switch} from "react-router-dom"
import {useRoutes} from "./routes"
import {AuthContext} from "./context/AuthContext"
import  {useAuth} from "./hooks/auth.hook"
import Footer from "./components/Footer/Footer";

function App() {

  const {login, logout, token, userId, isReady} = useAuth()
  const isLogin = !!token
  const routes = useRoutes(isLogin)

  return (
      <AuthContext.Provider value={{login, logout, token, userId, isReady, isLogin}}>
          <div className="app">
              <BrowserRouter>
                  <Navbar />
                 {routes}
                  <Footer />
              </BrowserRouter>
          </div>
      </AuthContext.Provider>

  )
}

export default App
