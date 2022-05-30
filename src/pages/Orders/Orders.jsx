import { useGetOrdersListQuery } from '../../redux/'
import { useDispatch, useSelector } from 'react-redux'
import { getOrdersData } from '../../redux/OrdersSlice'
import { Spin, Pagination } from 'antd'
import { ContentHeader } from '../../components/ContentHeader/ContentHeader'
import { DeleteOrder } from '../../components/DeleteOrder/DeleteOrder'
import { ChangeOrder } from '../../components/ChangeOrder/ChangeOrder'
import { ChangeStatus } from '../../components/ChangeStatus/ChangeStatus'
import { useState } from 'react'
import { OrdersList } from '../../components/OrdersList/OrdersList'

export const Orders = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)
  const [isVisibleDelete, setIsVisibleDelete] = useState(false)
  const [isVisibleChange, setIsVisibleChange] = useState(false)
  const [isVisibleStatusOrder, setIsVisibleStatusOrder] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [orderItem, setOrderItem] = useState('')
  const city = useSelector((state) => state.cities.cityId.id)
  const status = useSelector((state) => state.status.statusId.id)
  const car = useSelector((state) => state.car.carId.id)
  let totalPage = 0

  const orderDelete = (id) => {
    setIsVisibleDelete(true)
    setOrderId(id)
  }
  const orderChange = (id) => {
    setIsVisibleChange(true)
    setOrderItem(id)
    // dispatch(getStatusAlert(false))
  }
  const orderChangeStatus = (id) => {
    setIsVisibleStatusOrder(true)
    setOrderItem(id)
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

  if (isLoading) <Spin tip="Loading..." size="large" />

  if (isSuccess) {
    totalPage = data.count
    dispatch(getOrdersData(data.data))
  }
  return (
    <>
      <h1 className="title">Заказы</h1>
      <div
        className={
          isVisibleDelete || isVisibleChange || isVisibleStatusOrder
            ? 'content content__dark'
            : 'content'
        }>
        <ContentHeader />
        <DeleteOrder
          isVisibleDelete={isVisibleDelete}
          orderId={orderId}
          setIsVisibleDelete={setIsVisibleDelete}
        />
        <ChangeOrder
          orderItem={orderItem}
          isVisibleChange={isVisibleChange}
          setIsVisibleChange={setIsVisibleChange}
        />
        <ChangeStatus
          orderItem={orderItem}
          isVisibleStatusOrder={isVisibleStatusOrder}
          setIsVisibleStatusOrder={setIsVisibleStatusOrder}
        />
        <OrdersList
          orderDelete={orderDelete}
          orderChange={orderChange}
          orderChangeStatus={orderChangeStatus}
          data={data}
        />
        <Pagination
          showSizeChanger={false}
          total={totalPage}
          onChange={(e) => setPage(e - 1)}
          itemRender={(current, type, originalElement) =>
            itemRender(current, type, originalElement)
          }
        />
      </div>
    </>
  )
}
