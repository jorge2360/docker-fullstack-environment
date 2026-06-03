import { useEffect, useState } from 'react'

function App() {
  const [productos, setProductos] = useState([])
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [precio, setPrecio] = useState('')
  const [stock, setStock] = useState('')

  useEffect(() => {
    fetch('http://localhost:8000/api/productos')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error(error))
  }, [])
  const crearProducto = async (e) => {
  e.preventDefault()

    const response = await fetch(
      'http://localhost:8000/api/productos',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          descripcion,
          precio,
          stock,
        }),
      }
    )

    const nuevoProducto = await response.json()

    setProductos([...productos, nuevoProducto])

    setNombre('')
    setDescripcion('')
    setPrecio('')
    setStock('')
  }

  return (
  <div className="min-h-screen bg-slate-100 p-8">
    <div className="mx-auto max-w-6xl">

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          Sistema de Inventario
        </h1>

        <p className="mt-2 text-slate-600">
          Gestión de productos utilizando React, Laravel y PostgreSQL
        </p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-slate-500">
            Total Productos
          </h3>

          <p className="mt-2 text-3xl font-bold text-blue-600">
            {productos.length}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-slate-500">
            Stock Total
          </h3>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {productos.reduce(
              (total, p) => total + Number(p.stock || 0),
              0
            )}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-slate-500">
            Valor Inventario
          </h3>

          <p className="mt-2 text-3xl font-bold text-purple-600">
            Q{' '}
            {productos
              .reduce(
                (total, p) =>
                  total +
                  Number(p.precio || 0) *
                    Number(p.stock || 0),
                0
              )
              .toLocaleString()}
          </p>
        </div>

      </div>

      <div className="mb-8 rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">
          Nuevo Producto
        </h2>

        <form
          onSubmit={crearProducto}
          className="grid gap-4 md:grid-cols-2"
        >
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="rounded-lg border p-3"
          />

          <input
            type="text"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="rounded-lg border p-3"
          />

          <input
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="rounded-lg border p-3"
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="rounded-lg border p-3"
          />

          <button
            type="submit"
            className="rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700"
          >
            Guardar Producto
          </button>
        </form>
      </div>

      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">
          Productos Registrados
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Precio</th>
                <th className="p-3 text-left">Stock</th>
              </tr>
            </thead>

            <tbody>
              {productos.map((producto) => (
                <tr
                  key={producto.id}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="p-3">
                    {producto.id}
                  </td>

                  <td className="p-3">
                    {producto.nombre}
                  </td>

                  <td className="p-3">
                    Q {producto.precio}
                  </td>

                  <td className="p-3">
                    {producto.stock}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  </div>
)
}

export default App