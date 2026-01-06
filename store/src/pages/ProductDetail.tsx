import { useParams } from "react-router-dom"

export default function ProductDetail() {
  const { id } = useParams()
  return (
    <div className="p-4">
      <h1>🔍 Detalle del Producto</h1>
      <p>Estás viendo el producto ID: {id}</p>
    </div>
  )
}