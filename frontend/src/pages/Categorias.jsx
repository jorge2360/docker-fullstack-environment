import { useEffect, useState } from 'react'

import Layout from '../components/Layout'

import {
  obtenerCategorias,
  crearCategoriaAPI,
  actualizarCategoriaAPI,
  eliminarCategoriaAPI
} from '../services/api'

function Categorias() {

  const [categorias, setCategorias] = useState([])
  const [nombre, setNombre] = useState('')
  const [editandoId, setEditandoId] = useState(null)
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    cargarCategorias()
  }, [])

  const cargarCategorias = async () => {
    try {
      const data = await obtenerCategorias()
      setCategorias(data)
    } catch (error) {
      console.error(error)
    }
  }

  const crearCategoria = async (e) => {
    e.preventDefault()

    const nuevaCategoria =
      await crearCategoriaAPI({
        nombre,
      })

    setCategorias([
      ...categorias,
      nuevaCategoria,
    ])

    setNombre('')

    setMensaje('Categoría creada correctamente')

    setTimeout(() => {
      setMensaje('')
    }, 3000)
  }

  const editarCategoria = (categoria) => {
    setEditandoId(categoria.id)
    setNombre(categoria.nombre)
  }

  const actualizarCategoria = async (e) => {
    e.preventDefault()

    const categoriaActualizada =
      await actualizarCategoriaAPI(
        editandoId,
        {
          nombre,
        }
      )

    setCategorias(
      categorias.map((categoria) =>
        categoria.id === editandoId
          ? categoriaActualizada
          : categoria
      )
    )

    setEditandoId(null)
    setNombre('')

    setMensaje('Categoría actualizada correctamente')

    setTimeout(() => {
      setMensaje('')
    }, 3000)
  }

  const eliminarCategoria = async (id) => {

    const confirmar = window.confirm(
      '¿Desea eliminar esta categoría?'
    )

    if (!confirmar) return

    await eliminarCategoriaAPI(id)

    setCategorias(
      categorias.filter(
        (categoria) => categoria.id !== id
      )
    )

    setMensaje('Categoría eliminada correctamente')

    setTimeout(() => {
      setMensaje('')
    }, 3000)
  }

  return (
    <Layout>

      <h1 className="mb-8 text-4xl font-bold">
        Categorías
      </h1>

      {
        mensaje && (
          <div className="mb-4 rounded-lg bg-green-100 p-4 text-green-800">
            {mensaje}
          </div>
        )
      }

      <div className="mb-8 rounded-xl bg-white p-6 shadow">

        <form
          onSubmit={
            editandoId
              ? actualizarCategoria
              : crearCategoria
          }
          className="flex gap-4"
        >

          <input
            type="text"
            placeholder="Nombre de categoría"
            value={nombre}
            onChange={(e) =>
              setNombre(e.target.value)
            }
            className="flex-1 rounded-lg border p-3"
          />

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            {
              editandoId
                ? 'Actualizar'
                : 'Guardar'
            }
          </button>

        </form>

      </div>

      <div className="rounded-xl bg-white p-6 shadow">

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">
                ID
              </th>

              <th className="p-3 text-left">
                Nombre
              </th>

              <th className="p-3 text-left">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody>

            {
              categorias.map((categoria) => (
                <tr
                  key={categoria.id}
                  className="border-b"
                >

                  <td className="p-3">
                    {categoria.id}
                  </td>

                  <td className="p-3">
                    {categoria.nombre}
                  </td>

                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() =>
                        editarCategoria(categoria)
                      }
                      className="rounded-lg bg-yellow-500 px-3 py-2 text-white"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() =>
                        eliminarCategoria(categoria.id)
                      }
                      className="rounded-lg bg-red-600 px-3 py-2 text-white"
                    >
                      Eliminar
                    </button>

                  </td>

                </tr>
              ))
            }

          </tbody>

        </table>

      </div>

    </Layout>
  )
}

export default Categorias