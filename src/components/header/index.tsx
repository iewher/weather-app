import styles from "./index.module.scss";

export default function Header() {
  return (
    <div className={styles.Header}>
      <div className={styles.Logo}>Weather App</div>
      <div className={styles.Nav}>
        <a>Сегодня</a>
        <a>Завтра</a>
        <a>Ежемесячный прогноз</a>
      </div>
    </div>
  );
}
