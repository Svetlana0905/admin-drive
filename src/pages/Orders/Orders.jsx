import { useGetOrdersListQuery, useDeleteOrderDataMutation } from '../../redux/'
import { useSelector } from 'react-redux'
import { ItemRender } from '../../components/Button/Button'
import { Spin, Pagination } from 'antd'
import { ContentHeader } from '../../components/ContentHeader/ContentHeader'
import { DeleteOrder } from '../../components/DeleteOrder/DeleteOrder'
import { ChangeOrder } from '../../components/ChangeOrder/ChangeOrder'
import { ChangeStatus } from '../../components/ChangeStatus/ChangeStatus'
import { useEffect, useState } from 'react'
import { OrderComponent } from '../../components/OrderComponent/OrderComponent'
import { useNavigate } from 'react-router-dom'

export const Orders = () => {
  const pageSise = 4
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const [isVisibleDelete, setIsVisibleDelete] = useState(false)
  const [isVisibleChange, setIsVisibleChange] = useState(false)
  const [isVisibleStatusOrder, setIsVisibleStatusOrder] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [orderItem, setOrderItem] = useState('')

  useEffect(() => {
    if (page >= Math.ceil(totalPage / pageSise) && page > 1) {
      setPage(page - 1)
    }
  }, [page, totalPage])

  const city = useSelector((state) =>
    state.cities.cityId ? state.cities.cityId.id : ''
  )
  const status = useSelector((state) =>
    state.status.statusId ? state.status.statusId.id : ''
  )
  const car = useSelector((state) =>
    state.car.carId ? state.car.carId.id : ''
  )

  const [orderDeleteRequest, { isError }] = useDeleteOrderDataMutation()
  const [responseDelete, setResponseDelete] = useState(false)

  useEffect(() => {
    if (isError) {
      navigate('*')
    }
  }, [isError, navigate])

  const orderDelete = (id) => {
    setIsVisibleDelete(true)
    setOrderId(id)
  }

  const deleteItem = async (e) => {
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
  const { data = [], isLoading } = useGetOrdersListQuery({
    page,
    city,
    status,
    car
  })

  useEffect(() => {
    setTotalPage(data.count)
  }, [data])

  if (isLoading) return <Spin tip="Loading..." size="large" />

  return (
    <>
      <h2 className="title">Заказы</h2>
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
              <span className="text-dark">
                Заказ<span className="text-green"> {orderId}</span>
              </span>
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
              pageSize={pageSise}
              onChange={(e) => setPage(e - 1)}
              itemRender={ItemRender}
            />
          </>
        ) : (
          <div className="content__row">Записи не найдены</div>
        )}
      </div>
    </>
  )
}
