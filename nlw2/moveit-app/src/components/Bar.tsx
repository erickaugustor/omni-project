import styles from '../styles/components/Bar.module.css';

export function Bar() {
  return (
    <header className={styles.bar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: '50%' }} />
        <span className={styles.current} style={{ left: '50%' }}>300xp</span>
      </div>
      <span>600 xp</span>
    </header>
  )
};