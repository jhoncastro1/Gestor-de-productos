import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const endPoint = 'http://localhost:8000/api/product'

export const EditProduct = () => {
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const navigate = useNavigate()
    const { id } = useParams()

    const update = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await axios.put(`${endPoint}/${id}`, { description, price, stock })
        } catch (error) {
            console.error("Error al Actualizar el producto:", error)
        }
        navigate('/')
    }

    useEffect(() => {
        const getProductById = async () => {
            try {
                const response = await axios.get(`${endPoint}/${id}`)
                setDescription(response.data.description)
                setPrice(response.data.price)
                setStock(response.data.stock)
            } catch (error) {
                console.error("Error al obtener producto:", error)
            }
        }
        if (id) getProductById()
    }, [id])

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Editar Producto</h2>

            <form onSubmit={update} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <input
                        type="text"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                     Guardar Cambios
                </button>
            </form>
        </div>
    )
}

export default EditProduct


