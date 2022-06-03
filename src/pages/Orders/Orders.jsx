import { useGetOrdersListQuery, useDeleteOrderDataMutation } from '../../redux/'
import { useDispatch, useSelector } from 'react-redux'
import { getOrdersData } from '../../redux/OrdersSlice'
import { Spin, Pagination } from 'antd'
import { ContentHeader } from '../../components/ContentHeader/ContentHeader'
import { DeleteOrder } from '../../components/DeleteOrder/DeleteOrder'
import { ChangeOrder } from '../../components/ChangeOrder/ChangeOrder'
import { ChangeStatus } from '../../components/ChangeStatus/ChangeStatus'
import { useEffect, useState } from 'react'
import { OrderComponent } from '../../components/OrderComponent/OrderComponent'

export const Orders = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const [isVisibleDelete, setIsVisibleDelete] = useState(false)
  const [isVisibleChange, setIsVisibleChange] = useState(false)
  const [isVisibleStatusOrder, setIsVisibleStatusOrder] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [orderItem, setOrderItem] = useState('')

  const city = useSelector((state) => state.cities.cityId.id)
  const status = useSelector((state) => state.status.statusId.id)
  const car = useSelector((state) => state.car.carId.id)

  const [orderDeleteRequest] = useDeleteOrderDataMutation()
  const [responseDelete, setResponseDelete] = useState(false)

  const orderDelete = (id) => {
    setIsVisibleDelete(true)
    setOrderId(id)
  }
  const deleteItem = async (e) => {
    console.log(orderId)
    await orderDeleteRequest({ orderId }).unwrap()
    setResponseDelete(true)
    setTimeout(() => {
      setIsVisibleDelete(!isVisibleDelete)
      setResponseDelete(false)
    }, 2000)
  }
  const orderChange = (id) => {
    setIsVisibleChange(true)
    setOrderItem(id)
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
  useEffect(() => {
    setTotalPage(data.count)
  }, [data])

  if (isLoading) return <Spin tip="Loading..." size="large" />

  if (isSuccess) {
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
        <ContentHeader setPage={setPage} />
        <DeleteOrder
          isVisibleDelete={isVisibleDelete}
          orderId={orderId}
          setIsVisibleDelete={setIsVisibleDelete}
          itemDeleteRequest={deleteItem}
          responseDelete={responseDelete}
          deleteOrder={deleteItem}
          text={
            orderId ? (
              <p className="text-dark">
                Заказ<span className="text-green"> {orderId}</span>
              </p>
            ) : (
              'Заказ'
            )
          }
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
        {data?.data?.length ? (
          <>
            {data.data.map((item) => (
              <OrderComponent
                key={item.id}
                orderDelete={orderDelete}
                item={item}
                orderChange={orderChange}
                orderChangeStatus={orderChangeStatus}
              />
            ))}
            <Pagination
              showSizeChanger={false}
              current={page + 1}
              total={totalPage}
              pageSize={4}
              onChange={(e) => setPage(e - 1)}
              itemRender={itemRender}
            />
          </>
        ) : (
          <div className="content__row">Записи не найдены</div>
        )}
      </div>
    </>
  )
}
