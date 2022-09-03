import { useState } from "react";
import Button from "../Button/Button";
import PieChartInterest from "../PieChartInterest/PieChartInterest";
import PieChartSingle from "../PieChartSingle/PieChartSingle";
import styles from "./Statistic.module.scss";

enum typeSubPage {
  sprint,
  audioCall,
  words
}

const Statistic = () => {
  const [subPage, setSubPage] = useState<typeSubPage>(typeSubPage.sprint)

  return (
    <section className="game">
      <div className={styles.statistic__container} >
        <nav className={styles.statistic__buttons}>
          <Button
            disabled={subPage === typeSubPage.sprint}
            className={styles.statistic__button}
            onClick={() => setSubPage(typeSubPage.sprint)}>
            Статистика игры Спринт
          </Button>
          <Button
            disabled={subPage === typeSubPage.audioCall}
            className={styles.statistic__button}
            onClick={() => setSubPage(typeSubPage.audioCall)}>
            Статистика игры Аудиовызов
          </Button>
          <Button
            disabled={subPage === typeSubPage.words}
            className={styles.statistic__button}
            onClick={() => setSubPage(typeSubPage.words)}>
            Статистика по словам
          </Button>
        </nav>
        <div className={styles.statistic__diagrams}>
          <div className={styles.statistic__diagram}>
            <p className={styles.statistic__diagram_title}>
              Процент правильных ответов
            </p>
            <PieChartInterest
              data={[
                { title: 'Верных', value: 10, color: '#91cb39' },
                { title: 'Ошибок', value: 15, color: '#C13C37' },
              ]} />
          </div>
          <div className={styles.statistic__diagram}>
            <p className={styles.statistic__diagram_title}>
              Количество новых слов
            </p>
            <PieChartSingle
              data={[{ value: 82, color: '#E38627' }]} />
          </div>
          <div className={styles.statistic__diagram}>
            <p className={styles.statistic__diagram_title}>
              Самая длинная серия
            </p>
            <PieChartSingle
              data={[{ value: 82, color: '#C13C37' }]} />
          </div>
        </div>
      </div>
    </section >
  );
};

export default Statistic;