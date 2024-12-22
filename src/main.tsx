import { createRoot } from 'react-dom/client'
import { App } from './app/App.tsx'
import { Providers } from './app/providers/Providers.tsx'

createRoot(document.getElementById('root')!).render(
  <Providers>
    <App />
  </Providers>,
)
