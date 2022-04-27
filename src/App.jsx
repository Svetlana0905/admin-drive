import './style/app.scss'
import { Layout } from './components/Layout/Layout'
import { MainPage } from './pages/MainPage/MainPage'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
      </Route>
    </Routes>
  )
}
export default App
