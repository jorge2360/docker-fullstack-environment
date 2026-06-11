import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-800 text-white min-h-screen p-6">

      <h2 className="mb-8 text-2xl font-bold">
        Inventario
      </h2>

      <nav className="flex flex-col gap-3">

        <Link
          to="/"
          className="rounded-lg px-4 py-3 hover:bg-slate-700">Dashboard
        </Link>

        <Link
          to="/productos"
          className="rounded-lg px-4 py-3 hover:bg-slate-700">Productos
        </Link>

        <Link
          to="/categorias"
          className="rounded-lg px-4 py-3 hover:bg-slate-700">Categorías
        </Link>
      </nav>

    </aside>
  )
}

export default Sidebar