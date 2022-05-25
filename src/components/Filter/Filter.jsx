import './filter.scss'
import { Select } from 'antd'

export const Filter = () => {
  return (
    <div className="filter">
      <div className="filter__filter-inputs">
        <Select />
      </div>
      <div className="filter__filter-buttons">
        <button>Сбросить</button>
        <button>Добавить</button>
      </div>
    </div>
  )
}
