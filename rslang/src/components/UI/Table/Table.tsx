import { FC } from "react";
import { URL_BASE } from "../../../constants/constants";
import { ICustomStat } from "../../../types/types";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import PieChartInterest from "../PieChartInterest/PieChartInterest";
import { ReactComponent as YesLogo } from "./assets/check_circle.svg";
import { ReactComponent as NoLogo } from "./assets/x_circle.svg";
import styles from "./Table.module.scss";

interface ITableProps {
  stat: ICustomStat[] | null
  children?: React.ReactNode
}

const Table: FC<ITableProps> = ({ stat, children }) => {
  const mistakes = stat?.filter(item => !item.isRight).length;
  const rightAnswer = stat?.filter(item => item.isRight).length;

  return (
    <div className={styles.table__container} >
      {
        (stat === null || stat.length === 0)
          ? <p className={styles.notate}>К сожалению статистика пуста, вы не ответили ни на один вопрос. Попробуйте
            еще раз...</p>
          : <>
            <p className={styles.table__diagram_title}>
              <span>{children}</span>
            </p>
            <div className={styles.table__diagram}>
              <p className={styles.table__diagram_title}>
                Процент <span>правильных</span> ответов
              </p>
              <PieChartInterest
                data={[
                  { title: 'Верных ответов', value: rightAnswer !== undefined ? rightAnswer : 0, color: '#91cb39' },
                  { title: 'Ошибок', value: mistakes !== undefined ? mistakes : 0, color: '#C13C37' },
                ]} />
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Answer</th>
                  <th>Word</th>
                  <th>Translate</th>
                  <th>Listen</th>
                </tr>
              </thead>
              <tbody>
                {stat?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{
                        item.isRight
                          ? <YesLogo className={styles.logo_yes} />
                          : <NoLogo className={styles.logo_no} />
                      }
                      </td>
                      <td>{item.word.word}</td>
                      <td>{item.word.wordTranslate}</td>
                      <td><AudioPlayer
                        path={`${URL_BASE}/${item.word.audio}`}
                        className={styles.audioPlayer}
                      /></td>
                    </tr>
                  )
                })}
              </tbody>

            </table>
          </>
      }

    </div>

  );
};

export default Table;