import './style/app.scss'
import { Layout } from './components/Layout/Layout'
import { MainPage } from './pages/MainPage/MainPage'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="admin/" element={<Layout />}>
        <Route index element={<MainPage />} />
      </Route>
    </Routes>
  )
}
export default App
