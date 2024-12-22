import { Button, Result } from 'antd'
import useNetwork from '@/hooks/useNetwork'
import { Router } from '@/app/router'
import './style/app.css'

const App = () => {
  const { isOnline: isNetwork } = useNetwork()

  if (!isNetwork)
    return (
      <Result
        status='404'
        title='No Internet Connection'
        subTitle='Check your Internet Connection or your network.'
        extra={
          <Button href='/' type='primary'>
            Try Again
          </Button>
        }
      />
    )
  else {
    return <Router />
  }
}

export { App }
