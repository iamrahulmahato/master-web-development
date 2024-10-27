import SocketProvider from '@/context/SocketProvider'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <SocketProvider>
      <Component {...pageProps} />
    </SocketProvider>)
}
