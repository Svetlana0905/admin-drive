import { useGetCityQuery } from '../../redux/'
import { useDispatch } from 'react-redux'
import { getCityData } from '../../redux/CitySlice'
import { Table, Spin } from 'antd'

export const City = () => {
  const dispatch = useDispatch()
  const { data = [], isLoading, isSuccess } = useGetCityQuery()
  let dataSource = []

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Город',
      dataIndex: 'name',
      key: 'name'
    }
  ]

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

  if (isSuccess) {
    dataSource = data.data.map((item) => ({ ...item, key: item.id }))
    dispatch(getCityData(data.data))
  }
  return (
    <>
      <h1 className="title">CityList</h1>
      <div className="content-column">
        {isLoading && <Spin tip="Loading..." size="large" />}
        {dataSource.length ? (
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{
              pageSize: '5',
              position: ['bottomCenter'],
              size: 'small',
              itemRender: (current, type, originalElement) =>
                itemRender(current, type, originalElement)
            }}
          />
        ) : (
          ''
        )}
      </div>
    </>
  )
}
