import React, { useEffect, useState } from 'react'
import axios from 'axios'

import {Link} from 'react-router-dom'

export interface Product {
    id:number;
    description: string
    price: number
    stock: number
}

const ShowProducts = () => {
  const endPoint = 'http://localhost:8000/api'

  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    getAllProduct()
  }, [])

  const getAllProduct = async () => {
    try {
      const response = await axios.get<Product[]>(`${endPoint}/products`)
      setProducts(response.data)
    } catch (error) {
      console.error("Error al obtener productos:", error)
    }
  }

  const deleteProduct = async (id: number) => {
    try {
      await axios.delete(`${endPoint}/product/${id}`)
      getAllProduct()
    } catch (error) {
      console.error("Error al eliminar producto:", error)
    }
  }


  return (
 <div className="container mt-4">
      <h2 className="mb-4 text-center">Lista de Productos</h2>
      
      <div className="container mt-4">
        <Link to='/create' className='btn btn-success btn-lg mt-2 mb-2 text-white'>Crear un Nuevo producto</Link>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((prod) => (
                <tr key={prod.id}>
                  <td>{prod.description}</td>
                  <td>${prod.price.toLocaleString()}</td>
                  <td>{prod.stock}</td>
                  <td>
                    <Link 
                      to={`/edit/${prod.id}`} 
                      className="btn btn-warning btn-sm me-2"
                    >
                      Editar
                    </Link>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteProduct(prod.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">No hay productos disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ShowProducts
