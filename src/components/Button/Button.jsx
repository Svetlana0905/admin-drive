import './button.scss'
import { ReactComponent as Search } from '../../assets/icons/search.svg'

export const BigButton = ({ text, onClick, disabled, delite }) => {
  return (
    <button
      disabled={disabled}
      type="submit"
      className={
        delite ? 'form__button button button__delite' : 'form__button button'
      }
      onClick={onClick}>
      {text}
    </button>
  )
}
export const InputSearch = ({ onSearch }) => {
  return (
    <div className="search-block">
      <Search className="nav-link__img" width="14px" height="14px" />
      <input
        placeholder="Поиск …"
        onClick={onSearch}
        className={'search-block__input-search'}
      />
    </div>
  )
}
export const InputFile = ({ getFile, errorThumbnail }) => {
  return (
    <label
      className={
        errorThumbnail ? 'input-file input-file__error' : 'input-file'
      }>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => getFile(e.target.files[0])}
      />
      <span>Выберите файл...</span>
    </label>
  )
}
