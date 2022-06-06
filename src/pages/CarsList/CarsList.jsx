import './carsList.scss'
import { useGetCarQuery, useDeleteCarMutation } from '../../redux/'
import { CarComponent } from './CarComponent'
import { CarHeader } from './CarHeader'
import { Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { DeleteOrder } from '../../components/DeleteOrder/DeleteOrder'

export const CarsList = () => {
  const navigate = useNavigate()
  const pageSise = 5
  const [page, setPage] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const [carName, setCarName] = useState('')
  const [category, setCategory] = useState('')
  const [isVisibleDelete, setIsVisibleDelete] = useState(false)
  const [responseDelete, setResponseDelete] = useState(false)
  const [carItem, setCarItem] = useState('')
  const [carDeleteRequest] = useDeleteCarMutation()
  const { data: car = [], isLoading } = useGetCarQuery({
    page,
    limit: pageSise,
    category,
    name: carName
  })
  useEffect(() => {
    if (page >= Math.ceil(totalPage / pageSise) && page > 1) {
      setPage(page - 1)
    }
  }, [page, totalPage])
  const clearInputName = () => {
    setCarName('')
  }

  const deleteCar = (item) => {
    setIsVisibleDelete(true)
    setCarItem(item)
  }
  const changeCar = (item) => {
    navigate('/admin/car', { replace: true, state: item })
  }
  const deleteItem = async (e) => {
    setResponseDelete(true)
    await carDeleteRequest({ carId: carItem.id }).unwrap()
    setTimeout(() => {
      setIsVisibleDelete(!isVisibleDelete)
    }, 2000)
    setTimeout(() => {
      setResponseDelete(false)
    }, 2500)
  }
  useEffect(() => {
    setTotalPage(car.count)
  }, [car])

  if (isLoading) return <Spin tip="Loading..." size="large" />
  return (
    <>
      <h1 className="title">CarsList</h1>
      <div className="content">
        <div className="content-header">
          <CarHeader
            carName={carName}
            setCarName={setCarName}
            category={category}
            setCategory={setCategory}
            clearInputName={clearInputName}
          />
        </div>
        <DeleteOrder
          isVisibleDelete={isVisibleDelete}
          setIsVisibleDelete={setIsVisibleDelete}
          itemDeleteRequest={deleteItem}
          responseDelete={responseDelete}
          text={<span className="text-green"> {carItem.name}</span>}
        />
        <CarComponent
          setPage={setPage}
          totalPage={totalPage}
          car={car}
          page={page}
          pageSise={pageSise}
          deleteCar={deleteCar}
          changeCar={changeCar}
        />
      </div>
    </>
  )
}
