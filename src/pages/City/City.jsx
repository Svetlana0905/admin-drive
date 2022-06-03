import './list-block.scss'
import {
  useGetCityQuery,
  useDeleteCityDataMutation,
  useChangeCityMutation,
  useAddCityDataMutation
} from '../../redux/'
import { useDispatch } from 'react-redux'
import { getCityData } from '../../redux/CitySlice'
import { Spin } from 'antd'
import { SmallButton, ListButton } from '../../components/Button/Button'
import { DeleteOrder } from '../../components/DeleteOrder/DeleteOrder'
import { ModalCity } from './ModalCity'
import { useState } from 'react'

export const City = () => {
  const dispatch = useDispatch()
  const {
    data = [],
    isLoading,
    isSuccess
  } = useGetCityQuery({ page: 0, limit: 0 })
  const [cityDeleteRequest] = useDeleteCityDataMutation()
  const [cityChangeRequest] = useChangeCityMutation()
  const [cityAddRequest] = useAddCityDataMutation()

  const [cityName, setCityName] = useState('')
  const [deliteCityName, setDeliteCityName] = useState('')
  const [isDisabledModal, setIsDisabledModal] = useState(false)
  const [responseDelete, setResponseDelete] = useState(false)
  const [isVisibleDelete, setIsVisibleDelete] = useState(false)
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [isVisibleModalAdd, setIsVisibleModalAdd] = useState(false)
  const [cityId, setCityId] = useState('')
  const [errorMassage, setErrorMassage] = useState(false)
  let dataSource = []

  const closeModal = () => {
    setIsVisibleModalAdd(false)
    setIsVisibleModal(false)
    setCityName('')
  }
  const cityDelete = (item) => {
    setIsVisibleDelete(true)
    setCityId(item.id)
    setDeliteCityName(item.name)
  }
  const changeCity = (item) => {
    setErrorMassage(false)
    setCityId(item.id)
    setCityName(item.name)
    setIsDisabledModal(false)
    setIsVisibleModal(true)
  }
  const addCity = () => {
    setIsDisabledModal(false)
    setIsVisibleModalAdd(true)
    setCityName('')
  }
  const addItem = async () => {
    const data = {}
    data.name = cityName
    if (data.name) {
      setIsDisabledModal(true)
      await cityAddRequest({ data }).unwrap()
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
  const changeItem = async () => {
    setIsDisabledModal(true)
    const data = {}
    data.name = cityName
    if (cityName) {
      await cityChangeRequest({ cityId, data }).unwrap()
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
  const deleteItem = async (e) => {
    setResponseDelete(true)
    await cityDeleteRequest({ cityId }).unwrap()
    setTimeout(() => {
      setIsVisibleDelete(!isVisibleDelete)
      setResponseDelete(false)
    }, 2000)
  }
  if (isSuccess) {
    dataSource = data.data.map((item) => ({ ...item, key: item.id }))
    dispatch(getCityData(data.data))
  }
  return (
    <>
      <h1 className="title">CityList</h1>
      <div className={'list-block'}>
        {isLoading && <Spin tip="Loading..." size="large" />}
        <div className="content-header">
          <div className="content-header__btn-block"></div>
          <div className="content-header__btn-block">
            <SmallButton text="Создать" onClick={addCity} />
          </div>
        </div>
        <DeleteOrder
          isVisibleDelete={isVisibleDelete}
          itemId={cityId}
          setIsVisibleDelete={setIsVisibleDelete}
          itemDeleteRequest={deleteItem}
          responseDelete={responseDelete}
          text={deliteCityName}
        />
        <ModalCity
          isVisibleModal={isVisibleModal}
          closeModal={closeModal}
          actions={changeItem}
          text="Изменить"
          cityName={cityName}
          isDisabledModal={isDisabledModal}
          setCityName={setCityName}
          errorMassage={errorMassage}
        />
        <ModalCity
          isVisibleModal={isVisibleModalAdd}
          closeModal={closeModal}
          actions={addItem}
          text="Добавить"
          isDisabledModal={isDisabledModal}
          cityName={cityName}
          setCityName={setCityName}
          errorMassage={errorMassage}
        />
        {dataSource?.length ? (
          <>
            <div className="list-block__column">
              {dataSource.map((item, id) => (
                <div
                  className={
                    isVisibleDelete || isVisibleModal
                      ? 'list-block__dark'
                      : 'list-block__row'
                  }
                  key={id}>
                  <p className="list-block__text">{item.name}</p>
                  <div className="buttons-group">
                    <ListButton
                      text="Изменить"
                      clickHandler={(e) => changeCity(item)}
                    />
                    <ListButton
                      text="Удалить"
                      clickHandler={(e) => cityDelete(item)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          ''
        )}
      </div>
    </>
  )
}
