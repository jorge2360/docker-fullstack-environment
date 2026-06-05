function DashboardCards({ productos }) {
  return (
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
          Q {
            productos
              .reduce(
                (total, p) =>
                  total +
                  Number(p.precio || 0) *
                  Number(p.stock || 0),
                0
              )
              .toLocaleString()
          }
        </p>
      </div>

    </div>
  )
}

export default DashboardCards