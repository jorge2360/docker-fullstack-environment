import { useEffect, useState } from 'react'

function App() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/productos')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error(error))
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Inventario de Productos</h1>

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