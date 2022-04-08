import '../styles/globals.css'
// https://next-auth.js.org/getting-started/upgrade-v4#sessionprovider
// import { Provider } from 'next-auth/client'
import { SessionProvider  } from 'next-auth/react'

function MyApp({ Component, pageProps }) {
  return (
      <SessionProvider  session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider >
  )
}

export default MyApp
