import { useEffect, useState } from 'react'

export default function useNetwork() {
  const [isOnline, setNetwork] = useState(window.navigator.onLine)

  useEffect(() => {
    const updateNetworkStatus = () => setNetwork(window.navigator.onLine)

    window.addEventListener('online', updateNetworkStatus)
    window.addEventListener('offline', updateNetworkStatus)

    return () => {
      window.removeEventListener('online', updateNetworkStatus)
      window.removeEventListener('offline', updateNetworkStatus)
    }
  }, [])

  return { isOnline }
}
