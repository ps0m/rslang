import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.loader_container} >
      < div className={styles.loader} >

        {Array(12).fill('').map((_, index) => (
          <div key={index} className={styles.loader__circle}></div>
        ))}

        <div className={styles.loader__text}>Loading…</div>
      </ div>
    </div>

  );
};

export default Loader;