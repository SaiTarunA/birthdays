import React from 'react'

const UseNetworkStatus = () => {
    const [status, setStatus] = React.useState(navigator.onLine)

    React.useEffect(() => {
      const setOnline = () => {
        setStatus(true);
      }
      const setOffline = () => {
        setStatus(false);
      }

      window.addEventListener("online", setOnline)
      window.addEventListener("offline", setOffline)
    
      return () => {
        window.removeEventListener("online", setOnline)
        window.removeEventListener("offline", setOffline)
      }
    }, [])
    
  return status;
}

export default UseNetworkStatus