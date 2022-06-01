import '../../style/app.scss'
import { Outlet } from 'react-router-dom'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { SideBar } from '../SideBar/SideBar'
import { useEffect, useState } from 'react'
import { getStatusAlert } from '../../redux/alertSlice'
import { useDispatch, useSelector } from 'react-redux'

export const Layout = () => {
  const dispatch = useDispatch()
  const [isVisible, setIsVisible] = useState(false)
  const { status, text } = useSelector((state) => state.alert)

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(getStatusAlert(false))
    }, 3000)
    return () => {
      clearTimeout(timeout)
    }
  }, [status, dispatch])

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
        <SideBar isVisible={isVisible} setIsVisible={setIsVisible} />
        <div className="wrapper">
          <Header />
          <section className="container">
            <div className={status ? 'alert' : 'alert__hidden'}>
              <p>{text}</p>
              <button
                className="alert__close"
                onClick={() => dispatch(getStatusAlert(false))}></button>
            </div>
            <Outlet />
          </section>
          <Footer />
        </div>
      </main>
    </div>
  )
}
