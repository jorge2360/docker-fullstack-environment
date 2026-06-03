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
    <div style={{ padding: '20px' }}>
      <h1>Inventario de Productos</h1>

      <form onSubmit={crearProducto}>
        <h2>Nuevo producto</h2>

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Guardar producto
        </button>
      </form>

      <hr />
      <br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>Q {producto.precio}</td>
              <td>{producto.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App