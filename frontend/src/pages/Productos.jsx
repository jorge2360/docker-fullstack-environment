import { useEffect, useState } from 'react'

import Layout from '../components/Layout'
import DashboardCards from '../components/DashboardCards'
import ProductForm from '../components/ProductForm'
import ProductTable from '../components/ProductTable'
import SearchBar from '../components/SearchBar'

import {
  obtenerProductos,
  crearProductoAPI,
  actualizarProductoAPI,
  eliminarProductoAPI
} from '../services/api'

function Productos() {

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

    limpiarFormulario()

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

    limpiarFormulario()

    setMensaje('Producto actualizado correctamente')

    setTimeout(() => {
      setMensaje('')
    }, 3000)
  }

  const limpiarFormulario = () => {
    setEditandoId(null)
    setNombre('')
    setDescripcion('')
    setPrecio('')
    setStock('')
  }

  return (
    <Layout>

      <h1 className="mb-8 text-4xl font-bold">
        Productos
      </h1>

      {
        mensaje && (
          <div className="mb-4 rounded-lg bg-green-100 p-4 text-green-800">
            {mensaje}
          </div>
        )
      }

      <DashboardCards productos={productos} />

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

    </Layout>
  )
}

export default Productos