import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './Context/AppContext.jsx'
import { ClerkProvider } from '@clerk/react'

//import publishable key from .env file
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error('Missing publishable key!');
}

createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={publishableKey} afterSignOutUrl={'/'}>
    <BrowserRouter>
      <AppContextProvider>

        <App />

      </AppContextProvider>
    </BrowserRouter>
  </ClerkProvider>
)
