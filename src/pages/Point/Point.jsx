import {
  useGetCityQuery,
  useGetPointQuery,
  useDeletePointMutation,
  useAddPointDataMutation,
  useChangePointMutation
} from '../../redux/'
import { Spin } from 'antd'
import { PointComponent } from './PointComponent'
import { useEffect, useState } from 'react'
import { SmallButton } from '../../components/Button/Button'
import { ListDropdown } from '../../components/ListDropdown/ListDropdown'
import { DeleteOrder } from '../../components/DeleteOrder/DeleteOrder'
import { ModalPoint } from './ModalPoint'

export const Point = () => {
  const { data: pointArr = [], isLoading } = useGetPointQuery({
    page: 0,
    limit: 0
  })
  const {
    data: city = [],
    isSuccess: citySuccess,
    isLoading: cityLoadung
  } = useGetCityQuery({
    page: 0,
    limit: 0
  })
  const [pointDeleteRequest] = useDeletePointMutation()
  const [pointChangeRequest] = useChangePointMutation()
  const [pointAddRequest] = useAddPointDataMutation()
  const [filterPoint, setFilterPoint] = useState([])
  const [cityInput, setCityInput] = useState('')
  const [pointName, setPointName] = useState('')
  const [pointAddress, setPointAddress] = useState('')
  const [isVisibleDelete, setIsVisibleDelete] = useState(false)
  const [responseDelete, setResponseDelete] = useState(false)
  const [isVisibleModalAdd, setIsVisibleModalAdd] = useState(false)
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [isDisabledModal, setIsDisabledModal] = useState(false)
  const [errorMassage, setErrorMassage] = useState(false)
  const [itemPoint, setItemPoint] = useState({})
  const [cityObj, setCityObj] = useState({})

  let cityArr = []

  useEffect(() => {
    setFilterPoint(pointArr.data)
  }, [pointArr])

  const filterCity = () => {
    setFilterPoint(
      pointArr.data.filter(
        (item) => item.cityId && item.cityId.name === cityInput
      )
    )
  }
  if (citySuccess) {
    cityArr = Array.from(new Set(city.data.map((e) => e.name)))
  }
  const deletePoint = (item) => {
    setItemPoint(item)
    setIsVisibleDelete(true)
    // setPointId(item.id)
    // setDelitePointName(item.name)
  }
  const deleteItem = async (e) => {
    setResponseDelete(true)
    await pointDeleteRequest({ pointId: itemPoint.id }).unwrap()
    setTimeout(() => {
      setIsVisibleDelete(!isVisibleDelete)
      setResponseDelete(false)
    }, 2000)
  }
  const clearCityInput = () => {
    setCityInput('')
    setFilterPoint(pointArr.data)
  }
  const closeModal = () => {
    setIsVisibleModal(false)
    setIsVisibleModalAdd(false)
    setCityObj({})
    setItemPoint({})
    setErrorMassage(false)
    setPointName('')
    setPointAddress('')
  }
  const changePoint = (item) => {
    setErrorMassage(false)
    setItemPoint(item)
    setIsDisabledModal(false)
    setIsVisibleModal(true)
  }
  const changeItem = async () => {
    let { data } = itemPoint
    if (pointName && pointAddress) {
      data = {
        ...data,
        address: pointAddress,
        name: pointName
      }
      await pointChangeRequest({ pointId: itemPoint.id, data }).unwrap()
      setIsDisabledModal(true)
      setErrorMassage(false)
      setTimeout(() => {
        setIsVisibleModal(false)
      }, 2000)
      setTimeout(() => {
        setIsDisabledModal(false)
      }, 2500)
    } else {
      setErrorMassage(true)
      setIsDisabledModal(false)
      setIsVisibleModal(true)
    }
  }
  const addPoint = () => {
    setIsDisabledModal(false)
    setIsVisibleModalAdd(true)
  }
  const addItem = async () => {
    let { data } = itemPoint
    data = {
      ...data,
      address: pointAddress,
      cityId: cityObj[0],
      name: pointName
    }
    if (data.cityId && data.address && data.name) {
      setErrorMassage(false)
      await pointAddRequest({ data }).unwrap()
      setIsDisabledModal(true)
      setPointName('')
      setPointAddress('')
      setTimeout(() => {
        setIsVisibleModalAdd(false)
      }, 2000)
      setTimeout(() => {
        setIsDisabledModal(false)
      }, 2500)
    } else {
      setErrorMassage(true)
      setIsDisabledModal(false)
      setIsVisibleModalAdd(true)
    }
  }
  if (cityLoadung || isLoading) return <Spin tip="Loading..." size="large" />
  return (
    <>
      <h1 className="title">PointsList</h1>
      <div className="content">
        <div className="content-header">
          <div className="content-header__btn-block">
            <div className="modal-block__listdd">
              <ListDropdown
                textSpan="Выберите город"
                data={cityArr}
                setInputText={setCityInput}
                textInput={cityInput}
                clearInput={clearCityInput}
              />
            </div>
          </div>
          <div className="content-header__btn-block">
            <SmallButton text="Применить" onClick={filterCity} />
            <SmallButton text="Создать" onClick={addPoint} />
          </div>
        </div>
        <DeleteOrder
          isVisibleDelete={isVisibleDelete}
          itemId={itemPoint.id}
          setIsVisibleDelete={setIsVisibleDelete}
          itemDeleteRequest={deleteItem}
          responseDelete={responseDelete}
          text={itemPoint.name}
        />
        <ModalPoint
          isVisibleModal={isVisibleModalAdd}
          closeModal={closeModal}
          actions={addItem}
          setCityObj={setCityObj}
          text="Добавить"
          item={itemPoint}
          isDisabledModal={isDisabledModal}
          pointName={pointName}
          setPointName={setPointName}
          setPointAddress={setPointAddress}
          pointAddress={pointAddress}
          errorMassage={errorMassage}
          cityArr={cityArr}
          city={city}
        />
        <ModalPoint
          isVisibleModal={isVisibleModal}
          closeModal={closeModal}
          actions={changeItem}
          setCityObj={setCityObj}
          text="Изменить"
          item={itemPoint}
          isDisabledModal={isDisabledModal}
          pointName={pointName}
          setPointName={setPointName}
          setPointAddress={setPointAddress}
          pointAddress={pointAddress}
          errorMassage={errorMassage}
        />
        {filterPoint?.length ? (
          <>
            {filterPoint.map((item) => (
              <PointComponent
                key={item.id}
                deletePoint={deletePoint}
                changePoint={changePoint}
                item={item}
              />
            ))}
          </>
        ) : (
          <div className="content__row">Записи не найдены</div>
        )}
      </div>
    </>
  )
}
