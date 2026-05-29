import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState('Cargando...')

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}`)
      .then((response) => response.text())
      .then((data) => {
        setMessage(data)
      })
      .catch(() => {
        setMessage('Error conectando backend')
      })
  }, [])

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1>Docker Fullstack Environment</h1>

      <p>{message}</p>
    </div>
  )
}

export default App