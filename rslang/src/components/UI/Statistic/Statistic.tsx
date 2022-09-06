import { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "../../../context/context";
import { useFetch } from "../../../hooks/useFetch";
import { IOptionalStatisticGame, IOptionalStatisticWords, IStatistic } from "../../../types/types";
import { getUserStatistics } from "../../API/API";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import PieChartInterest from "../PieChartInterest/PieChartInterest";
import PieChartSingle from "../PieChartSingle/PieChartSingle";
import styles from "./Statistic.module.scss";

type typeSubPage = 'sprint' | 'audio' | 'words';

const Statistic = () => {
  const [subPage, setSubPage] = useState<typeSubPage>('sprint')
  const [statistics, setStatistics] = useState<IStatistic | null>(null);
  const [fetchStat, isStatLoad, StatError] = useFetch(getStat)

  const sprintStat = useRef<IOptionalStatisticGame | null>(null)
  const audiotStat = useRef<IOptionalStatisticGame | null>(null)
  const wordstStat = useRef<IOptionalStatisticWords | null>(null)

  const { isAuth } = useContext(MyContext)

  async function getStat() {
    if (isAuth === null) {
      return
    }

    const stat: IStatistic = await getUserStatistics(isAuth.userId, isAuth.token);

    sprintStat.current = stat.optional.daily.sprint;
    audiotStat.current = stat.optional.daily.audio;
    wordstStat.current = stat.optional.daily.words;

    setStatistics(stat)
  }

  useEffect(() => {
    fetchStat();
  }, [])

  return (
    isStatLoad
      ? <Loader></Loader>
      : <section className="game">
        <div className={styles.statistic__container} >

          <nav className={styles.statistic__buttons}>
            <Button
              disabled={subPage === 'sprint'}
              className={styles.statistic__button}
              onClick={() => setSubPage('sprint')}>
              Статистика игры Спринт
            </Button>
            <Button
              disabled={subPage === 'audio'}
              className={styles.statistic__button}
              onClick={() => setSubPage('audio')}>
              Статистика игры Аудиовызов
            </Button>
            <Button
              disabled={subPage === 'words'}
              className={styles.statistic__button}
              onClick={() => setSubPage('words')}>
              Статистика по словам
            </Button>
          </nav>
          {
            statistics?.optional.daily[subPage].totalAnswer !== 0
              ? <div className={styles.statistic__diagrams}>
                <div className={styles.statistic__diagram}>
                  <p className={styles.statistic__diagram_title}>
                    Процент <span>правильных</span> ответов
                  </p>
                  <PieChartInterest
                    data={[
                      {
                        title: 'Верных ответов',
                        value: statistics ? statistics.optional.daily[subPage].rightAnswer : 0,
                        color: '#91cb39'
                      },
                      {
                        title: 'Ошибок',
                        value: statistics ? statistics.optional.daily[subPage].totalAnswer -
                          statistics.optional.daily[subPage].rightAnswer : 0,
                        color: '#C13C37'
                      },
                    ]} />
                </div>
                <div className={styles.statistic__diagram}>
                  <p className={styles.statistic__diagram_title}>
                    Количество новых слов
                  </p>
                  <PieChartSingle
                    data={[{ value: statistics ? statistics.optional.daily[subPage].newWords : 0, color: '#E38627' }]} />
                </div>
                {subPage === 'words'
                  ? <>
                    <div className={styles.statistic__diagram}>
                      <p className={styles.statistic__diagram_title}>
                        Количество изученных слов за день
                      </p>
                      <PieChartSingle
                        data={[{ value: statistics ? statistics.optional.daily.words.learnedWords : 0, color: '#C13C37' }]}
                        totalValue={50}
                      />
                    </div>
                  </>
                  : <>
                    <div className={styles.statistic__diagram}>
                      <p className={styles.statistic__diagram_title}>
                        Самая длинная серия
                      </p>
                      {
                        subPage === 'sprint'
                          ? <PieChartSingle
                            data={[{
                              value: statistics ? statistics.optional.daily.sprint.maxSeries : 0,
                              color: '#C13C37',
                            }]}
                            totalValue={50} />
                          : <PieChartSingle
                            data={[{
                              value: statistics ? statistics.optional.daily.audio.maxSeries : 0,
                              color: '#C13C37',
                            }]}
                            totalValue={50} />
                      }

                    </div>
                  </>
                }
              </div>
              : <p className={styles.statistic__notate}> Статистика в данном разделе отсутствует</p>
          }


        </div>
      </section >
  );
};

export default Statistic;