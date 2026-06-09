import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

function InventoryValueChart({ productos }) {

  const data = {
    labels: productos.map(
      (producto) => producto.nombre
    ),

    datasets: [
      {
        label: 'Valor Inventario (Q)',
        data: productos.map(
          (producto) =>
            Number(producto.precio) *
            Number(producto.stock)
        ),

        backgroundColor: [
        
        '#16a34a',
        '#ea580c',
        '#9333ea',
        '#dc2626',
        '#0891b2',
        ],
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-semibold">
        Valor del Inventario por Producto
      </h2>

      <Bar
        data={data}
        options={options}
      />
    </div>
  )
}

export default InventoryValueChart