import '../../style/app.scss'
import { Outlet } from 'react-router-dom'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { SideBar } from '../SideBar/SideBar'
import { useState } from 'react'

export const Layout = () => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="body">
      <main className="main">
        <div className="sidebar-btn">
          <button
            className={isVisible ? 'burger active' : 'burger'}
            onClick={() => setIsVisible(!isVisible)}>
            <span></span>
          </button>
        </div>
        <SideBar isVisible={isVisible} />
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
