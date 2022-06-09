import './footer.scss'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__links">
        <Link to={'/'} className="footer__link">
          Главная страница
        </Link>
        <Link to={'#'} className="footer__link">
          Ссылка
        </Link>
      </div>
      <span className="footer__copyright">Copyright © 2020 Simbirsoft</span>
    </footer>
  )
}
