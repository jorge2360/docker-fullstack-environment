import Sidebar from './Sidebar'

function Layout({ children }) {
  return (
    <div className="flex min-h-screen">

      <Sidebar />

      <main className="flex-1 bg-slate-100 p-8">
        {children}
      </main>

    </div>
  )
}

export default Layout