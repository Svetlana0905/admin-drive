import './errorPage.scss'
import { useNavigate } from 'react-router-dom'

export const ErrorPage = () => {
  const navigate = useNavigate()
  const goBack = () => navigate(-1)

  return (
    <section className="error">
      <div className="error__block">
        <p className="error__500">500</p>
        <p className="error__title">Что то пошло не так</p>
        <p className="error__text">Попробуйте перезагрузить страницу</p>
        <button onClick={goBack} className="button button__small">
          <span>Назад</span>
        </button>
      </div>
    </section>
  )
}
