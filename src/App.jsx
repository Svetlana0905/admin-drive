import 'antd/dist/antd.css'
import './style/app.scss'
// import 'antd/dist/antd.css'
import { Layout } from './components/Layout/Layout'
import { CarSetting } from './pages/CarSetting/CarSetting'
import { CarsList } from './pages/CarsList/CarsList'
import { City } from './pages/City/City'
import { Point } from './pages/Point/Point'
import { Tarif } from './pages/Tarif/Tarif'
import { TarifType } from './pages/TarifType/TarifType'
// import { OrderStatus } from './pages/OrderStatus/OrderStatus'
import { Orders } from './pages/Orders/Orders'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="admin/" element={<Layout />}>
        <Route path="car" element={<CarSetting />} />
        <Route path="cars-list" element={<CarsList />} />
        <Route path="city" element={<City />} />
        <Route path="point" element={<Point />} />
        <Route path="tarif" element={<Tarif />} />
        <Route path="tarif-type" element={<TarifType />} />
        {/* <Route path="order-status" element={<OrderStatus />} /> */}
        <Route path="orders" element={<Orders />} />
      </Route>
    </Routes>
  )
}
export default App
