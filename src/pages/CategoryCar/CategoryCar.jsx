import { useGetCategoryQuery, useAddCategoryCarMutation } from '../../redux/'
import { Spin } from 'antd'
import { InputStandart } from '../../components/LoginInput/LoginInput'
import { useState, useEffect } from 'react'

export const CategoryCar = () => {
  const { data = [], isLoading } = useGetCategoryQuery()
  const [categoryName, setCategoryName] = useState('')
  const [categoryDescription, setCategoryDescription] = useState('')
  const [categoryAddRequest] = useAddCategoryCarMutation()
  useEffect(() => {
    console.log(categoryName)
  }, [categoryName])
  console.log(data)
  const addCategory = async () => {
    const data = {}
    data.name = categoryName
    data.description = categoryDescription
    if (data.name) {
      await categoryAddRequest({ data }).unwrap()
      // setTimeout(() => {
      //   dispatch(getStatusAlert('Город был успешно добавлен!'))
      // }, 2000)
      //    setTimeout(() => {
      //      setIsVisibleModalAdd(false)
      //      setIsDisabledModal(false)
      //    }, 2500)
      //  } else {
      //    setErrorMessage(true)
      //    setIsDisabledModal(false)
      //    setIsVisibleModalAdd(true)
    }
  }
  return (
    <>
      {isLoading && <Spin tip="Loading..." size="large" />}
      <div>Category</div>
      <InputStandart
        value={categoryName}
        onChange={setCategoryName}
        //   placeholder={props.text === 'Изменить' ? cityName : 'Введите город'}
        type="text"
      />
      <InputStandart
        value={categoryDescription}
        onChange={setCategoryDescription}
        //   placeholder={props.text === 'Изменить' ? cityName : 'Введите город'}
        type="text"
      />
      <button onClick={addCategory} className="button button__small">
        Add
      </button>
    </>
  )
}
