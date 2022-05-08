import './style/app.scss'
import { Layout } from './components/Layout/Layout'
import { CarSetting } from './pages/CarSetting/CarSetting'
import { OrderList } from './pages/OrderList/OrderList'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { Routes, Route } from 'react-router-dom'
import { Table } from './pages/Table/Table'
import { Page4 } from './pages/Page4/Page4'

function App() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="admin/" element={<Layout />}>
        <Route path="car" element={<CarSetting />} />
        <Route path="order" element={<OrderList />} />
        <Route path="table" element={<Table />} />
        <Route path="page4" element={<Page4 />} />
      </Route>
    </Routes>
  )
}
export default App
