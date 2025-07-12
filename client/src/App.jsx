import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './component/authentication/login'
import Register from './component/authentication/register'
import TaskLisk from './component/task/tasklisk'
import Home from './component/Home'
import Dashboard from './component/Dashboard'
import DashLayout from './component/DashLayout'
import { TaskProvider } from './component/context/TaskContext'

function App() {
  const RenderRoute = () => (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/task' element={<TaskLisk />} />
      <Route path='/' element={<Home />} />
      <Route path='/dash' element={<Dashboard />} />
      <Route path='/dashboard' element={<DashLayout />} />
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