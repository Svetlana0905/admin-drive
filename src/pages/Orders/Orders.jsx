import { useGetOrdersListQuery } from '../../redux/'
import { useDispatch, useSelector } from 'react-redux'
import { getOrdersData } from '../../redux/OrdersSlice'
import { getDate } from '../../components/GetDate/GetDate'
import { Spin, Pagination } from 'antd'
import { ContentHeader } from '../../components/ContentHeader/ContentHeader'
import { Checkbox } from '../../components/Button/Button'
import { useState } from 'react'
import stub from '../../assets/stub.jpg'

export const Orders = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)
  const city = useSelector((state) => state.cities.cityId.id)
  const status = useSelector((state) => state.status.statusId.id)
  const car = useSelector((state) => state.car.carId.id)

  const {
    data = [],
    isLoading,
    isSuccess
  } = useGetOrdersListQuery({ page, city, status, car })

  function itemRender(current, type, originalElement) {
    if (type === 'prev') {
      return (
        <button className="pagination-btn" type="button">
          «
        </button>
      )
    }
    if (type === 'next') {
      return (
        <button className="pagination-btn" type="button">
          »
        </button>
      )
    }
    return originalElement
  }
  const onChange = (num) => {
    setPage(num - 1)
  }
  if (isLoading) <Spin tip="Loading..." size="large" />

  if (isSuccess) {
    console.log(data.data)
    dispatch(getOrdersData(data.data))
  }
  return (
    <>
      <h1 className="title">Заказы</h1>
      <div className="content">
        <ContentHeader />
        {data.data ? (
          data.data.map((item, id) => (
            <div key={id} className="content__row">
              <div className="content__description">
                <p className="content__img-inner">
                  {item.carId ? (
                    <img
                      src={item.carId.thumbnail.path}
                      className="content__car-pic"
                      alt={item.name}
                    />
                  ) : (
                    <img
                      src={stub}
                      className="content__car-pic"
                      alt={item.name}
                    />
                  )}
                </p>
                <div className="content__column">
                  <p className="text-dark">
                    {item.carId ? item.carId.name : 'Авто не указан'}
                    <span className="text-light"> в </span>
                    <span className="text-dark">
                      {item.cityId ? item.cityId.name : 'не указан'}
                    </span>
                    <span className="text-light">
                      , {item.pointId ? item.pointId.address : 'не указан'}
                    </span>
                  </p>
                  <p className="text-light">
                    {getDate(item.dateFrom)} - {getDate(item.dateTo)}
                  </p>
                  <p className="text-dark">
                    <span className="text-light">Цвет </span> {item.color}
                  </p>
                </div>
              </div>
              <div className="content__options">
                <Checkbox
                  text={'Детское кресло'}
                  checked={item.isNeedChildChair}
                  readonly
                />
                <Checkbox
                  text={'Правый руль'}
                  checked={item.isRightWheel}
                  readonly
                />
                <Checkbox
                  text={'Полный бак'}
                  checked={item.isFullTank}
                  readonly
                />
              </div>
              <p className="content__price">{item.price ? item.price : 0} ₽</p>
              <div className="buttons-group">
                {/* <button className="buttons-group__btn ready">Готово</button> */}
                <button className="buttons-group__btn cancel">Удалить</button>
                <button className="buttons-group__btn change">Изменить</button>
              </div>
            </div>
          ))
        ) : (
          <div className="content__row">
            <p className="text-link">Нет заказа с такими данными ¯\_(ツ)_/¯</p>
          </div>
        )}
        <Pagination
          showSizeChanger={false}
          total={2000}
          onChange={(e) => onChange(e)}
          itemRender={(current, type, originalElement) =>
            itemRender(current, type, originalElement)
          }
        />
      </div>
    </>
  )
}
