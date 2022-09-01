import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.pl_container} >
      < div className={styles.pl} >
        <div className={styles.pl__dot}></div>
        <div className={styles.pl__dot}></div>
        <div className={styles.pl__dot}></div>
        <div className={styles.pl__dot}></div>
        <div className={styles.pl__dot}></div>
        <div className={styles.pl__dot}></div>
        <div className={styles.pl__dot}></div>
        <div className={styles.pl__dot}></div>
        <div className={styles.pl__dot}></div>
        <div className={styles.pl__dot}></div>
        <div className={styles.pl__dot}></div>
        <div className={styles.pl__dot}></div>
        <div className={styles.pl__text}>Loading…</div>
      </ div>
    </div>

  );
};

export default Loader;