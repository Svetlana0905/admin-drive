import { useEffect, useState } from 'react'

export const GetImage = ({ setThumbnail, file }) => {
  const [path, setPath] = useState()
  useEffect(() => {
    if (file) {
      let obj = {}
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        setPath(reader.result)
      }
      // console.log(path)
      // console.log(file.size)
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
    <div className="car-block__file-block">
      {file ? (
        <ImageThumb image={file} />
      ) : (
        <p className="car-block__title-text logo-text">Выберите файл</p>
      )}
    </div>
  )
}
