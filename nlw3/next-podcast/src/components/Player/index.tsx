import styles from './styles.module.scss';

export default function Player() {
  return (
    <div className={styles.playerContainer}>
      <header>
        <img alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      <div className={styles.emptyPlayer}>
        <strong>Selecione um podcast para ouvir</strong>
      </div>

      <footer className={styles.empty}>
        <div className={styles.progress}>
          <span>00:00</span>

          <div className={styles.slider}>
            <div className={styles.emptySlider} />
          </div>

          <span>00:00</span>
        </div>

        <div className={styles.buttons}>
          <button type="button">
            <img alt="Embaralhar" />
          </button>

          <button type="button">
            <img alt="Tocar anterior" />
          </button>

          <button type="button" className={styles.playButton}>
            <img alt="Tocar" />
          </button>
          
          <button type="button">
            <img alt="Tocar próxima" />
          </button>

          <button type="button">
            <img alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  )
}