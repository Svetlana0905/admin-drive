import { ListDropdown } from '../../components/ListDropdown/ListDropdown'
import { useGetCarQuery } from '../../redux/'
import { Link } from 'react-router-dom'
import { Spin } from 'antd'

export const CarHeader = ({
  carName,
  setCarName,
  category,
  setCategory,
  categoryResponse
}) => {
  const { data: carArr = [], isLoading } = useGetCarQuery({ page: 0, limit: 0 })

  return (
    <>
      {isLoading ? (
        <Spin tip="Loading..." size="large" />
      ) : (
        <>
          {carArr?.data ? (
            <div className="content-header__btn-block">
              <div className="content-header__wrapper">
                <ListDropdown
                  textSpan="Выберите авто"
                  data={Array.from(new Set(carArr.data.map((e) => e)))}
                  setInputText={setCarName}
                  textInput={carName}
                  clearInput={() => setCarName('')}
                  placeholder="По названию"
                  name="category"
                />
              </div>
              <div className="content-header__wrapper">
                <ListDropdown
                  textSpan="Выберите категорию"
                  data={Array.from(
                    new Set(categoryResponse?.data.map((e) => e.name))
                  )}
                  setInputText={setCategory}
                  textInput={category}
                  clearInput={() => setCategory('')}
                  placeholder="По категории"
                />
              </div>
            </div>
          ) : (
            ''
          )}
        </>
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
