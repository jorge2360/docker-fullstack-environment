const API_URL = 'http://localhost:8000/api/productos'

export const obtenerProductos = async () => {
  const response = await fetch(API_URL)
  return response.json()
}

export const crearProductoAPI = async (producto) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(producto),
  })

  return response.json()
}

export const actualizarProductoAPI = async (id, producto) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(producto),
  })

  return response.json()
}

export const eliminarProductoAPI = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })
}

export const obtenerCategorias = async () => {
  const response = await fetch(
    'http://localhost:8000/api/categorias'
  )

  return response.json()
}