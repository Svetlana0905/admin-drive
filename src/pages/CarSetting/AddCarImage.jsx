import { InputFile } from '../../components/Button/Button'
import { useState, useEffect } from 'react'
import { Image } from 'antd'
import { getDescriptionCar } from '../../redux/CarPageSlice'
import { useDispatch, useSelector } from 'react-redux/'

export const AddCarImage = ({
  setThumbnail,
  setFile,
  file,
  carThumbnail,
  state,
  percent,
  setPercent
}) => {
  const dispatch = useDispatch()

  const percentField = 12 // процент заполнения поля
  const [description, setDescription] = useState(
    state?.description ? state.description : ''
  )
  const dataState = useSelector((state) => state.carPage.data)
  const [path, setPath] = useState()

  useEffect(() => {
    dispatch(getDescriptionCar(description))
  }, [state, description, dispatch])

  useEffect(() => {
    let valueArr = []
    valueArr = Object.entries(dataState)
    function isempty(x) {
      if (x[1].length || x[1] > 0 || Object.keys(x[1]).length) return true
    }
    const num = valueArr.filter(isempty)
    const totalNum = Math.ceil(num.length)
    setPercent(totalNum * percentField < 100 ? totalNum * percentField : 100)
  }, [dataState, percent, setPercent])

  useEffect(() => {
    if (file) {
      let obj = {}
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        setPath(reader.result)
      }
      obj = {
        size: file.size,
        originalname: file.name,
        mimetype: file.type,
        path: path
      }
      setThumbnail(obj)
    }
  }, [file, setPath, path, setThumbnail])

  const ImageThumb = ({ image }) => {
    return (
      <img
        src={URL.createObjectURL(image)}
        alt={image.name}
        className="car-block__img"
      />
    )
  }

  return (
    <div className="content-car__car-block car-block">
      <div className="car-block__file-block">
        <div className="car-block__file-block">
          {carThumbnail ? (
            <div>
              <Image width={200} src={carThumbnail.path} />
            </div>
          ) : (
            <>
              {file ? (
                <ImageThumb image={file} />
              ) : (
                <p className="car-block__title-text logo-text">Выберите файл</p>
              )}
            </>
          )}
        </div>
        <InputFile getFile={setFile} carThumbnail={carThumbnail} />
      </div>
      <label className="car-block__progress-block progress-block">
        <p className="progress-block__title-block">
          <span className="car-block__caption thin">Заполнено</span>
          <span className="small-roboto">{percent}</span>
        </p>
        <progress
          className="progress"
          min="0"
          value={percent}
          max="100"></progress>
      </label>
      <div className="car-block__definition definition">
        <span className="car-block__caption">Описание</span>
        <textarea
          value={description}
          placeholder="Добавьте описание"
          rows="5"
          cols="33"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </div>
  )
}
