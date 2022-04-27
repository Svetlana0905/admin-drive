import '../../style/app.scss'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div className="body">
      <main className="main">
        <Outlet />
      </main>
    </div>
  )
}
