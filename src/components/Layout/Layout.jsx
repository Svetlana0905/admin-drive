import '../../style/app.scss'
import { Outlet } from 'react-router-dom'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { SideBar } from '../SideBar/SideBar'

export const Layout = () => {
  return (
    <div className="body">
      <main className="main">
        <SideBar />
        <div className="wrapper">
          <Header />
          <section className="container">
            <Outlet />
          </section>
          <Footer />
        </div>
      </main>
    </div>
  )
}
