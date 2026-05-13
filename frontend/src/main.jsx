import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        pauseOnFocusLoss={false}
        draggable
        theme="colored"
        limit={4}
      />
      <App />
    </QueryClientProvider>
  </StrictMode>
)