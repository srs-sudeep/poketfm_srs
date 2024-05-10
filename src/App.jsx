import Router from './routes/routes'
import { useEffect, useState } from 'react'
// routes
import { BrowserRouter } from 'react-router-dom'
import { LoadingPage } from './components'
function App() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  if (loading) {
    return <LoadingPage />
  }
  return <BrowserRouter>{<Router />}</BrowserRouter>
}

export default App
