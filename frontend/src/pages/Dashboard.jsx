import { useEffect, useState } from 'react'

import Layout from '../components/Layout'
import DashboardCards from '../components/DashboardCards'
import StockChart from '../components/charts/StockChart'
import InventoryValueChart from '../components/charts/InventoryValueChart'

import {
  obtenerProductos
} from '../services/api'

function Dashboard() {

  const [productos, setProductos] = useState([])

  useEffect(() => {
    cargarProductos()
  }, [])

  const cargarProductos = async () => {
    const data = await obtenerProductos()
    setProductos(data)
  }

  return (
    <Layout>

      <h1 className="mb-8 text-4xl font-bold">
        Dashboard
      </h1>

      <DashboardCards
        productos={productos}
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <StockChart
          productos={productos}
        />

        <InventoryValueChart
          productos={productos}
        />

      </div>

    </Layout>
  )
}

export default Dashboard