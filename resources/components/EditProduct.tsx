import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const endPoint = 'http://localhost:8000/api/product'

export const EditProduct = () => {
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState<number>(0)
    const [stock, setStock] = useState<number>(0)
    const [image, setImage] = useState<File | null>(null)
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()

    const update = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const formData = new FormData()
            formData.append("description", description)
            formData.append("price", price.toString())
            formData.append("stock", stock.toString())
            formData.append("_method", "PUT")

            if (image) {
                formData.append("image", image)
            }

            await axios.post(`${endPoint}/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })

            navigate("/")
            
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
            console.error("Error completo:", error)

            if (error.response?.status === 422) {
                const validationErrors = error.response.data.errors
                console.error("Errores de validación:", validationErrors)

                // Muestra errores específicos
                let errorMessage = "Errores de validación:\n"
                Object.keys(validationErrors).forEach(key => {
                    errorMessage += `${key}: ${validationErrors[key].join(', ')}\n`
                })
                alert(errorMessage)
            } else {
                alert("Error al actualizar el producto: " + error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    // Manejar cambio de imagen para mostrar preview
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setImage(file)

            // Crear preview de la nueva imagen
            const reader = new FileReader()
            reader.onload = (e) => {
                setPreviewImage(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    useEffect(() => {
        const getProductById = async () => {
            try {
                const response = await axios.get(`${endPoint}/${id}`)
                const product = response.data

                setDescription(product.description)
                setPrice(parseFloat(product.price))
                setStock(parseInt(product.stock))

                // Asegurar que la URL de la imagen sea absoluta si es relativa
                if (product.image) {
                    const imageUrl = product.image.startsWith('http')
                        ? product.image
                        : `http://localhost:8000/storage/${product.image}`
                    setPreviewImage(imageUrl)
                }
            } catch (error) {
                console.error("Error al obtener producto:", error)
                alert("Error al cargar el producto")
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
                        step="0.01"
                        className="form-control"
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Stock</label>
                    <input
                        type="number"
                        className="form-control"
                        value={stock}
                        onChange={(e) => setStock(parseInt(e.target.value))}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Imagen</label>
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <small className="form-text text-muted">
                        Deja vacío para mantener la imagen actual
                    </small>
                </div>

                {previewImage && (
                    <div className="mb-3">
                        <p>Imagen {image ? 'nueva' : 'actual'}:</p>
                        <img
                            src={previewImage}
                            alt="preview"
                            width="150"
                            className="img-thumbnail"
                        />
                    </div>
                )}

                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                >
                    {loading ? 'Guardando...' : 'Guardar Cambios'}
                </button>
            </form>
        </div>
    )
}

export default EditProduct