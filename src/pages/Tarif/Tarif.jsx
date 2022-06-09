import '../City/list-block.scss'
import './tarif.scss'
import {
  useGetTarifQuery,
  useChangeTarifMutation,
  useDeleteTarifDataMutation,
  useAddTarifMutation
} from '../../redux'
import { Spin } from 'antd'
import { SmallButton } from '../../components/Button/Button'
import { DeleteOrder } from '../../components/DeleteOrder/DeleteOrder'
import { ModalTarif } from './ModalTarif'
import { TarifContent } from './TarifContent'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getStatusAlert } from '../../redux/alertSlice'

export const Tarif = () => {
  const dispatch = useDispatch()
  const {
    data = [],
    isLoading,
    isSuccess
  } = useGetTarifQuery({ page: 0, limit: 0 })
  const [tarifDeleteRequest] = useDeleteTarifDataMutation()
  const [tarifChangeRequest] = useChangeTarifMutation()
  const [tarifTypeAddRequest] = useAddTarifMutation()

  const [tarifPrice, setTarifPrice] = useState('')
  const [item, setItem] = useState({})
  const [errorNumber, setErrorNumber] = useState(false)
  const [tarifRate, setTarifRate] = useState({})
  const [isDisabledModal, setIsDisabledModal] = useState(false)
  const [responseDelete, setResponseDelete] = useState(false)
  const [isVisibleDelete, setIsVisibleDelete] = useState(false)
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [isVisibleModalAdd, setIsVisibleModalAdd] = useState(false)
  const [tarifId, setTarifId] = useState('')
  const [errorMassage, setErrorMassage] = useState(false)
  let dataSource = []

  const closeModal = () => {
    setIsVisibleModal(false)
    setIsVisibleModalAdd(false)
    setTarifRate({})
    setItem({})
    setErrorNumber(false)
    setErrorMassage(false)
    setTarifPrice('')
  }
  const tarifDelete = (item) => {
    setIsVisibleDelete(true)
    setTarifId(item.id)
    setItem(item)
  }
  const changeTarif = (item) => {
    setErrorMassage(false)
    setItem(item)
    setTarifId(item.id)
    setTarifPrice(item.price ? +item.price : 0)
    setIsDisabledModal(false)
    setIsVisibleModal(true)
  }
  const changeItem = async () => {
    let { data } = item
    if (tarifPrice && !isNaN(tarifPrice)) {
      data = {
        ...data,
        price: tarifPrice
      }
      await tarifChangeRequest({ tarifId, data }).unwrap()
      setIsDisabledModal(true)
      setErrorNumber(false)
      setErrorMassage(false)
      setTimeout(() => {
        dispatch(getStatusAlert('Тариф был успешно изменен!'))
        setIsVisibleModal(false)
      }, 2000)
      setTimeout(() => {
        setIsVisibleModal(false)
        setIsDisabledModal(false)
      }, 3000)
    } else {
      setErrorMassage(true)
      setIsDisabledModal(false)
      setIsVisibleModal(true)
      setErrorNumber(true)
    }
  }
  const addTarif = () => {
    setIsVisibleModalAdd(true)
  }
  const addItem = async () => {
    let { data } = item
    data = {
      ...data,
      price: tarifPrice,
      rateTypeId: tarifRate[0]
    }
    if (tarifPrice && !isNaN(tarifPrice) && data.rateTypeId) {
      await tarifTypeAddRequest({ data }).unwrap()
      setIsDisabledModal(true)
      setTimeout(() => {
        dispatch(getStatusAlert('Тариф был добавлен!'))
      }, 2000)
      setTimeout(() => {
        setTarifPrice('')
        setIsVisibleModalAdd(false)
        setIsDisabledModal(false)
        setErrorNumber(false)
        setErrorMassage(false)
      }, 3000)
    } else {
      setErrorMassage(true)
      setIsDisabledModal(false)
      setIsVisibleModalAdd(true)
      setErrorNumber(true)
    }
  }
  const deleteItem = async (e) => {
    setResponseDelete(true)
    await tarifDeleteRequest({ tarifId }).unwrap()
    setTimeout(() => {
      setIsVisibleDelete(!isVisibleDelete)
    }, 2000)
    setTimeout(() => {
      setResponseDelete(false)
    }, 2500)
  }
  if (isLoading) return <Spin tip="Loading..." size="large" />
  if (isSuccess) {
    dataSource = data.data
  }

  return (
    <>
      <h1 className="title">Тарифы</h1>
      <div
        className={
          isVisibleDelete || isVisibleModal || isVisibleModalAdd
            ? 'content content__dark'
            : 'content'
        }>
        <div className="content-header">
          <div className="content-header__btn-block"></div>
          <div className="content-header__btn-block">
            <SmallButton text="Создать" onClick={addTarif} />
          </div>
        </div>
        <div className="tarif__subtitle-block">
          <p className="tarif__subtitle-block-tarif">
            <span>Тариф</span>
          </p>
          <span className="tarif__subtitle-block-price">Цена</span>
          <span className="tarif__subtitle-block-buttons">Действие</span>
        </div>
        <DeleteOrder
          isVisibleDelete={isVisibleDelete}
          itemId={tarifId}
          setIsVisibleDelete={setIsVisibleDelete}
          itemDeleteRequest={deleteItem}
          responseDelete={responseDelete}
          text={
            item.rateTypeId ? (
              <span className="text-green"> {item.rateTypeId.name}</span>
            ) : (
              'Тариф'
            )
          }
        />
        <ModalTarif
          isVisibleModal={isVisibleModal}
          closeModal={closeModal}
          actions={changeItem}
          text="Изменить"
          item={item}
          isDisabledModal={isDisabledModal}
          tarifPrice={tarifPrice}
          setTarifPrice={setTarifPrice}
          errorMassage={errorMassage}
          errorNumber={errorNumber}
        />
        <ModalTarif
          isVisibleModal={isVisibleModalAdd}
          closeModal={closeModal}
          actions={addItem}
          setTarifRate={setTarifRate}
          text="Добавить"
          item={item}
          isDisabledModal={isDisabledModal}
          tarifPrice={tarifPrice}
          setTarifPrice={setTarifPrice}
          errorMassage={errorMassage}
          errorNumber={errorNumber}
        />
        <TarifContent
          dataSource={dataSource}
          isVisibleDelete={isVisibleDelete}
          isVisibleModalAdd={isVisibleModalAdd}
          changeTarif={changeTarif}
          tarifDelete={tarifDelete}
        />
      </div>
    </>
  )
}
