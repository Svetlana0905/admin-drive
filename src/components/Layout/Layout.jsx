import '../../style/app.scss'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div className="body">
      <main className="main">
        <h1>Layout</h1>

        <Outlet />
      </main>
    </div>
  )
}
