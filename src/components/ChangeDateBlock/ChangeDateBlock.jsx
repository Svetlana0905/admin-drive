import './dateBlock.scss'
import { useEffect, useState } from 'react'
import { getDate } from '../../components/GetDate/GetDate'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import setHours from 'date-fns/setHours'
import ru from 'date-fns/locale/ru'
import setMinutes from 'date-fns/setMinutes'
import { useDispatch } from 'react-redux'
import { getDateFrom, getDateTo } from '../../redux/OrdersSlice'

export const ChangeDateBlock = ({ orderItem }) => {
  const dispatch = useDispatch()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  const startDateHandler = (item) => {
    setStartDate(item.getTime())
    setEndDate(new Date(startDate).getTime())
  }

  const endDateHandler = (item) => {
    setEndDate(new Date(item).getTime())
  }

  useEffect(() => {
    setStartDate(new Date(orderItem.dateFrom).getTime())
    setEndDate(new Date(orderItem.dateTo).getTime())
  }, [orderItem])

  useEffect(() => {
    if (endDate > startDate) {
      dispatch(getDateFrom(startDate))
      dispatch(getDateTo(endDate))
    }
  }, [startDate, endDate, dispatch])

  return (
    <div className="change-date-block">
      <p className="text-link">Дата аренды</p>
      {orderItem ? (
        <div className="change-date-block__inner">
          <p>
            <span className="text text-green">С </span>
            <span className="text-dark">{getDate(startDate)}</span>
            <span className="text text-green"> ПO </span>
            <span className="text-dark">{getDate(endDate)}</span>
          </p>
          <p className="text-link text-green">Изменить дату</p>
          <div className="change-date-block__datepicker-block">
            <label className="change-date-block__datepicker-inner">
              <span className="text-dark">С</span>
              <DatePicker
                selected={startDate}
                minDate={new Date()}
                onChange={(item) => startDateHandler(item)}
                minTime={
                  startDate === new Date().getDate()
                    ? startDate
                    : setHours(setMinutes(new Date(), 0), 0)
                }
                maxTime={setHours(setMinutes(new Date(), 59), 23)}
                className="input-text"
                placeholderText={'Введите дату и время'}
                timeIntervals={60}
                dateFormat="dd.MM.yyyy HH:mm"
                timeFormat="HH:mm"
                showTimeInput
                locale={ru}
              />
            </label>
            <label className="change-date-block__datepicker-inner">
              <span className="text-dark">По</span>
              <DatePicker
                selected={endDate}
                minDate={startDate}
                onChange={(item) => endDateHandler(item)}
                minTime={startDate}
                maxTime={setHours(setMinutes(new Date(), 59), 23)}
                className="input-text"
                placeholderText={'Введите дату и время'}
                timeIntervals={60}
                timeFormat="HH:mm"
                dateFormat="dd.MM.yyyy HH:mm"
                showTimeInput
                locale={ru}
              />
            </label>
          </div>
        </div>
      ) : (
        <p>no date</p>
      )}
    </div>
  )
}
