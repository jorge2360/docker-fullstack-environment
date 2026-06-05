function ProductTable({
  productos,
  editarProducto,
  eliminarProducto
}) {
  return (
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
              <th className="p-3 text-left">Descripción</th>
              <th className="p-3 text-left">Precio</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((producto) => (
              <tr
                key={producto.id}
                className="border-b hover:bg-slate-50"
              >
                <td className="p-3">{producto.id}</td>

                <td className="p-3">
                  {producto.nombre}
                </td>

                <td className="p-3">
                  {producto.descripcion}
                </td>

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
                      const confirmar =
                        window.confirm(
                          `¿Desea eliminar el producto "${producto.nombre}"?`
                        )

                      if (confirmar) {
                        eliminarProducto(producto.id)
                      }
                    }}
                    className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                  >
                    Eliminar
                  </button>

                  <button
                    onClick={() =>
                      editarProducto(producto)
                    }
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
  )
}

export default ProductTable