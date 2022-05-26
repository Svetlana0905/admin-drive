import { useGetOrdersListQuery } from '../../redux/'
import { useDispatch, useSelector } from 'react-redux'
import { getOrdersData } from '../../redux/OrdersSlice'
import { getDate } from '../../components/GetDate/GetDate'
import { Spin, Pagination } from 'antd'
import { ContentHeader } from '../../components/ContentHeader/ContentHeader'
import { Checkbox } from '../../components/Button/Button'
import { DeliteOrder } from '../../components/DeliteOrder/DeliteOrder'
import { useState } from 'react'
import stub from '../../assets/stub.jpg'

export const Orders = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)
  const [isVisibleDelite, setIsVisibleDelite] = useState(false)
  const [orderId, setOrderId] = useState('')
  const city = useSelector((state) => state.cities.cityId.id)
  const status = useSelector((state) => state.status.statusId.id)
  const car = useSelector((state) => state.car.carId.id)
  let totalPage = 0

  const orderDelite = (id) => {
    setIsVisibleDelite(true)
    setOrderId(id)
  }

  const {
    data = [],
    isLoading,
    isSuccess
  } = useGetOrdersListQuery({ page, city, status, car })

  function itemRender(_, type, originalElement) {
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
    // console.log(data.data)
    totalPage = data.count
    dispatch(getOrdersData(data.data))
  }
  return (
    <>
      <h1 className="title">Заказы</h1>
      <div
        className={isVisibleDelite ? 'content content__dark' : 'content'}
        // className={'content'}
      >
        <ContentHeader />
        <DeliteOrder
          isVisible={isVisibleDelite}
          orderId={orderId}
          setIsVisibleDelite={setIsVisibleDelite}
        />
        {data.data ? (
          data.data.map((item) => (
            <div key={item.id} className="content__row">
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
                  <p className="text-dark">
                    <span className="text-light">Статус </span>
                    {item.orderStatusId ? item.orderStatusId.name : 'не указан'}
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
                <button
                  className="buttons-group__btn cancel"
                  onClick={() => orderDelite(item.id)}>
                  Удалить
                </button>

                <button className="buttons-group__btn change">Изменить</button>
              </div>
            </div>
          ))
        ) : (
          <div className="content__row">
            <Spin tip="Данные загружаются..." size="large" />
          </div>
        )}
        <Pagination
          showSizeChanger={false}
          total={totalPage}
          onChange={(e) => onChange(e)}
          itemRender={(current, type, originalElement) =>
            itemRender(current, type, originalElement)
          }
        />
      </div>
    </>
  )
}
