function ProductForm({
  nombre,
  setNombre,
  descripcion,
  setDescripcion,
  precio,
  setPrecio,
  stock,
  setStock,

  categoriaId,
  setCategoriaId,
  categorias,

  editandoId,
  setEditandoId,
  crearProducto,
  actualizarProducto,
})
{
  return (
    <div className="mb-8 rounded-xl bg-white p-6 shadow">

      <form
        onSubmit={
          editandoId
            ? actualizarProducto
            : crearProducto
        }
      >

        <h2 className="mb-4 text-xl font-semibold">
          {
            editandoId
              ? 'Editar Producto'
              : 'Nuevo Producto'
          }
        </h2>

        <div className="grid gap-4 md:grid-cols-5">

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

          <select
            value={categoriaId}
            onChange={(e) =>
              setCategoriaId(e.target.value)
            }
            className="rounded-lg border p-3">
            <option value="">
              Seleccione categoría
            </option>

            {categorias.map((categoria) => (
              <option
                key={categoria.id}
                value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>

        </div>

        <div className="mt-4 flex gap-2">

            <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                {
                editandoId
                    ? 'Actualizar Producto'
                    : 'Guardar Producto'
                }
            </button>

            {editandoId && (
                <button
                type="button"
                onClick={() => {
                    setEditandoId(null)
                    setNombre('')
                    setDescripcion('')
                    setPrecio('')
                    setStock('')
                }}
                className="rounded-lg bg-slate-500 px-4 py-2 text-white hover:bg-slate-600">Cancelar</button>
            )}

            </div>

      </form>

    </div>
  )
}

export default ProductForm