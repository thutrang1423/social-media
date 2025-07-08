import { useContext } from 'react'
import './App.css'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import HomePage from './pages/home'
import ProfilePage from './pages/profile'
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Navbar from './components/layout/navbar'
import Leftbar from './components/layout/leftBar'
import Rightbar from './components/layout/rightBar'
import { AuthContext } from './context/authen/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'



function App() {

  const { currentUser } = useContext(AuthContext)
  const queryClient = new QueryClient()

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div>
          <Navbar />
          <div style={{ display: 'flex' }}>
            <Leftbar />
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            <Rightbar />
          </div>
        </div>
      </QueryClientProvider>
    )
  }

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to='/login' />
    }
    return children
  }

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path='/profile/:id' element={<ProfilePage />} />
        </Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </>
  )
}

export default App
