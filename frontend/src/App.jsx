import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Productos from './pages/Productos'
import Categorias from './pages/Categorias'

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/productos"
          element={<Productos />}
        />

        <Route
          path="/categorias"
          element={<Categorias />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App