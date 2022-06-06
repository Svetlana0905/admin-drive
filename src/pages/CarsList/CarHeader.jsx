import { ListDropdown } from '../../components/ListDropdown/ListDropdown'
import { useGetCarQuery } from '../../redux/'
import { Link } from 'react-router-dom'
import { Spin } from 'antd'

export const CarHeader = ({ carName, setCarName, clearInputName }) => {
  const { data: carArr = [], isLoading } = useGetCarQuery({ page: 0, limit: 0 })

  if (isLoading) return <Spin tip="Loading..." size="large" />

  return (
    <>
      {carArr?.data ? (
        <div className="content-header__btn-block">
          <div className="content-header__wrapper">
            <ListDropdown
              textSpan="Выберите авто"
              data={Array.from(new Set(carArr.data.map((e) => e.name)))}
              setInputText={setCarName}
              textInput={carName}
              clearInput={clearInputName}
              placeholder="По названию"
            />
          </div>
        </div>
      ) : (
        ''
      )}

      <div className="content-header__btn-block">
        <Link
          to="/admin/car"
          className="button button__small button__small-link">
          <span>Создать</span>
        </Link>
      </div>
    </>
  )
}
