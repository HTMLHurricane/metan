import { ConfigProvider } from 'antd'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import ruRU from 'antd/locale/ru_RU'

const queryClient = new QueryClient()

const Providers = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ConfigProvider locale={ruRU}>{children}</ConfigProvider>
    </BrowserRouter>
  </QueryClientProvider>
)

export { Providers }
