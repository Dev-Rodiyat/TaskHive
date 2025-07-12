import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './component/authentication/login'
import Register from './component/authentication/register'
import TaskLisk from './component/task/tasklisk'
import Home from './component/Home'
import Dashboard from './component/Dashboard'
import DashLayout from './component/DashLayout'
import { TaskProvider } from './component/context/TaskContext'
import About from './component/About'
import NotFound from './component/NotFound'
import ProtectedRoute from './component/ProtectedRoute'
import PublicRoute from './component/PublicRoute'

function App() {
  const RenderRoute = () => (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path="*" element={<NotFound />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashLayout />
          </ProtectedRoute>
        }
      />
    </Routes>
  )

  return (
    <>
      <TaskProvider>
        {RenderRoute()}
      </TaskProvider>
    </>
  )
}

export default App