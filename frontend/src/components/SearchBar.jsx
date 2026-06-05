function SearchBar({ busqueda, setBusqueda }) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full rounded-lg border p-3"
      />
    </div>
  )
}

export default SearchBar