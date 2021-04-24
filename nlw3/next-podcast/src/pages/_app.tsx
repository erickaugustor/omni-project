import '../styles/globals.scss'

import Header from '../components/Header'
import Player from '../components/Player'

import styles from '../styles/app.module.scss'

import { PlayerContextProvider } from '../contexts/playerContext'

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>

        <Player />
      </div>
    </PlayerContextProvider>
  )
}

export default MyApp
