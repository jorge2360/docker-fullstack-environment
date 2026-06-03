import { useEffect, useState } from 'react'

function App() {
  const [productos, setProductos] = useState([])
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [precio, setPrecio] = useState('')
  const [stock, setStock] = useState('')
  const [editandoId, setEditandoId] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [mensaje, setMensaje] = useState('')

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
    setMensaje('Producto creado correctamente')

    setTimeout(() => {
      setMensaje('')
    }, 3000)
  }

  const eliminarProducto = async (id) => {

    await fetch(
      `http://localhost:8000/api/productos/${id}`,
      {
        method: 'DELETE',
      }
    )

    setProductos(
      productos.filter(
        (producto) => producto.id !== id
      )
    )
    setMensaje('Producto eliminado correctamente')
    setTimeout(() => {
      setMensaje('')
    }, 3000)
  }

  const editarProducto = (producto) => {

    setEditandoId(producto.id)

    setNombre(producto.nombre)
    setDescripcion(producto.descripcion)
    setPrecio(producto.precio)
    setStock(producto.stock)
  }

  const actualizarProducto = async (e) => {

    e.preventDefault()

    const response = await fetch(
      `http://localhost:8000/api/productos/${editandoId}`,
      {
        method: 'PUT',
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

    const productoActualizado = await response.json()

    setProductos(
      productos.map((producto) =>
        producto.id === editandoId
          ? productoActualizado
          : producto
      )
    )

    setEditandoId(null)

    setNombre('')
    setDescripcion('')
    setPrecio('')
    setStock('')
    setMensaje('Producto actualizado correctamente')

    setTimeout(() => {
      setMensaje('')
    }, 3000)
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

        {
          mensaje && (
            <div className="mb-4 rounded-lg bg-green-100 p-4 text-green-800">
              {mensaje}
            </div>
          )
        }

        <form
          className="grid gap-4 md:grid-cols-2"
          onSubmit={
            editandoId
              ? actualizarProducto
              : crearProducto
          }
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
            className="rounded-lg bg-blue-600 px-4 py-3 text-white font-medium hover:bg-blue-700 transition"
          >
            {editandoId
              ? 'Actualizar producto'
              : 'Guardar producto'}
          </button>
          {
            editandoId && (
              <button
                type="button"
                onClick={() => {
                  setEditandoId(null)
                  setNombre('')
                  setDescripcion('')
                  setPrecio('')
                  setStock('')
                }}
                className="rounded-lg bg-slate-500 px-4 py-3 text-white hover:bg-slate-600 md:col-span-2"
              >
                Cancelar edición
              </button>
            )
          }
        </form>
      </div>

      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">
          Productos Registrados
        </h2>

        <div className="overflow-x-auto">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="mb-4 w-full rounded-lg border p-3"
          />
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Descripción</th>
                <th className="p-3 text-left">Precio</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-left">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {productos
                .filter((producto) =>
                  producto.nombre
                    .toLowerCase()
                    .includes(busqueda.toLowerCase())
                )
                .map((producto) => (
                <tr
                  key={producto.id}
                  className="border-b hover:bg-slate-50">
                  <td className="p-3">
                    {producto.id}
                  </td>

                  <td className="p-3">
                    {producto.nombre}
                  </td>

                  <td className="p-3">
                    {producto.descripcion}</td>

                  <td className="p-3">
                    Q {producto.precio}
                  </td>

                  <td className="p-3">
                    <span
                      className={`rounded-full px-3 py-1 text-white ${
                        producto.stock <= 5
                          ? 'bg-red-500'
                          : producto.stock <= 15
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                    >
                      {producto.stock}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => {

                        const confirmar = window.confirm(
                          `¿Desea eliminar el producto "${producto.nombre}"?`
                        )

                        if (confirmar) {
                          eliminarProducto(producto.id)
                        }
                      }}
                      className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700">Eliminar</button>
                      <button
                      onClick={() => editarProducto(producto)}
                      className="rounded-lg bg-yellow-500 px-3 py-2 text-white hover:bg-yellow-600"
                    >
                      Editar
                    </button>
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