import styles from '../styles/components/Profile.module.css';

export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/erickaugustor.png" alt="Erick" />
      <div>
        <strong>Erick</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Nível 1
        </p>
      </div>
    </div>
  );
}