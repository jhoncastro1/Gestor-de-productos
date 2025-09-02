import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const endPoint = 'http://localhost:8000/api/product'

export default function CreateProducts() {
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [image, setImage] = useState<File | null>(null)

  const navigate = useNavigate()

  const store = async (e: React.FormEvent) => {
  e.preventDefault()
  try {
    const formData = new FormData()
    formData.append('description', description)
    formData.append('price', price.toString())
    formData.append('stock', stock.toString())
    if (image) {
      formData.append('image', image) // importante: el name debe coincidir con el backend
    }

    await axios.post(endPoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    navigate('/')
  } catch (error) {
    console.error("Error al guardar el producto:", error)
  }
}


  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Crear Producto</h2>

      <form onSubmit={store} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ingrese descripción"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Ingrese precio"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            type="number"
            className="form-control"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            placeholder="Ingrese stock disponible"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Imagen</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          />
        </div>

        <button type="submit" className="btn btn-success w-100">Guardar</button>
      </form>
    </div>
  )
}
