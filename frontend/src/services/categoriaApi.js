const API_URL =
  'http://localhost:8000/api/categorias'

export const obtenerCategorias =
  async () => {

    const response =
      await fetch(API_URL)

    return response.json()
}