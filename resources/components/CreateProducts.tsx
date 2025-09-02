import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const endPoint = 'http://localhost:8000/api/product'

export default function CreateProducts() {
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const navigate = useNavigate()

  const store = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post(endPoint, { description, price, stock })
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

        <button type="submit" className="btn btn-success w-100">Guardar</button>
      </form>
    </div>
  )
}
