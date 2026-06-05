import { useEffect, useState } from 'react'
import DashboardCards from './components/DashboardCards'
import ProductForm from './components/ProductForm'
import ProductTable from './components/ProductTable'
import SearchBar from './components/SearchBar'
import {
  obtenerProductos,
  crearProductoAPI,
  actualizarProductoAPI,
  eliminarProductoAPI
} from './services/api'

function App() {
  const [productos, setProductos] = useState([])
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [precio, setPrecio] = useState('')
  const [stock, setStock] = useState('')
  const [editandoId, setEditandoId] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [mensaje, setMensaje] = useState('')

  const productosFiltrados = productos.filter(
  (producto) =>
    producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase())
)

  useEffect(() => {
    cargarProductos()
  }, [])

  const cargarProductos = async () => {
    try {
      const data = await obtenerProductos()
      setProductos(data)
    } catch (error) {
      console.error(error)
    }
  }

  const crearProducto = async (e) => {
    e.preventDefault()

    const nuevoProducto =
      await crearProductoAPI({
        nombre,
        descripcion,
        precio,
        stock,
      })

    setProductos([
      ...productos,
      nuevoProducto,
    ])

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

    await eliminarProductoAPI(id)

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

    const productoActualizado =
      await actualizarProductoAPI(
        editandoId,
        {
          nombre,
          descripcion,
          precio,
          stock,
        }
      )

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

      {
        mensaje && (
          <div className="mb-4 rounded-lg bg-green-100 p-4 text-green-800">
            {mensaje}
          </div>
        )
      }


      <DashboardCards
        productos={productos}
      />

      <ProductForm
        nombre={nombre}
        setNombre={setNombre}
        descripcion={descripcion}
        setDescripcion={setDescripcion}
        precio={precio}
        setPrecio={setPrecio}
        stock={stock}
        setStock={setStock}
        editandoId={editandoId}
        setEditandoId={setEditandoId}
        crearProducto={crearProducto}
        actualizarProducto={actualizarProducto}
      />

      <SearchBar
        busqueda={busqueda}
        setBusqueda={setBusqueda}
      />

      <ProductTable
        productos={productosFiltrados}
        editarProducto={editarProducto}
        eliminarProducto={eliminarProducto}
      />


    </div>
  </div>
)
}
export default App