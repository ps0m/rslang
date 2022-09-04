import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWords } from "../components/API/API";
import Button from "../components/UI/Button/Button";
import CardOfAudio from "../components/UI/CardOfAudio/CardOfAudio";
import Header from "../components/UI/Header/Header";
import LevelPanel from "../components/UI/LevelPanel/LevelPanel";
import Loader from "../components/UI/Loader/Loader";
import PopUpMenu from "../components/UI/PopUpMenu/PopUpMenu";
import Progress from "../components/UI/Progress/Progress";
import { ReactComponent as NoLogo } from "../components/UI/Table/assets/x_circle.svg";
import Table from "../components/UI/Table/Table";
import { AMOUNT_VARIANTS_OF_AUDIO_GAMES, MAX_MISTAKES_OF_AUDIO_GAMES, PAGES_PER_GROUP } from "../constants/constatnts";
import { shuffleArray } from "../helpers/helpers";
import { useFetch } from "../hooks/useFetch";
import { IContentForAudio, ICustomStat, IWords } from "../types/types";

type typeWord = number | undefined;

const AudioCallGame = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [group, setGroup] = useState<number | undefined>();
  const [words, setWords] = useState<IWords[]>([]);
  const [contentForCard, setContentForCard] = useState<IContentForAudio | null>(null);
  const [statistic, setStatistic] = useState<ICustomStat[] | null>(null);
  const [amountMistakes, setAmountMistakes] = useState<number>(0);
  const [fetchWords, isWordsLoad, wordsError] = useFetch(getWordsForGame)


  async function getWordsForGame(): Promise<void> {
    if (group === undefined) {
      return
    }
    const arrayPromisesWord = [];


    for (let i = 0; i < PAGES_PER_GROUP; i++) {
      arrayPromisesWord.push(getWords(group, i))
    }

    const allWordsOfgroup = await Promise.all(arrayPromisesWord)

    setWords(allWordsOfgroup.flat())
  }

  useEffect(() => {
    // if (group !== undefined) {
    fetchWords();
    // }
  }, [group])

  const getOrderRandomWords = (words: IWords[]) => {
    if (words.length === 0) {
      return
    }

    const randomIndexWordStudy = Math.floor(Math.random() * words.length)
    const randomWordStudy = words[randomIndexWordStudy]
    const randomExtraWords: IWords[] = []

    randomExtraWords.push(randomWordStudy);

    for (let i = 1; i < AMOUNT_VARIANTS_OF_AUDIO_GAMES; i++) {
      let randomIndexExtraWords

      do {
        randomIndexExtraWords = Math.floor(Math.random() * words.length)

      } while (randomExtraWords.includes(words[randomIndexExtraWords]));

      randomExtraWords.push(words[randomIndexExtraWords])
    }

    setContentForCard({
      wordStudy: randomWordStudy,
      extraWords: shuffleArray(randomExtraWords),
      currentIndex: randomIndexWordStudy
    });
  }

  const updateStatistic = (newItem: ICustomStat) => {
    statistic === null
      ? setStatistic([newItem])
      : setStatistic([...statistic, newItem])
  }

  const getResultOneStepGame = (newItem: ICustomStat) => {
    updateStatistic(newItem);
  }

  useEffect(() => {
    if (statistic !== null
      && contentForCard !== null
      && words !== null) {
      setWords([...words.slice(0, contentForCard?.currentIndex), ...words.slice(contentForCard?.currentIndex + 1)])
    }
  }, [statistic])


  useEffect(() => {
    if (words !== undefined) {
      getOrderRandomWords(words);
    }
  }, [words])



  return (
    <>
      {menuActive && <PopUpMenu setActive={setMenuActive} />}
      <Header />
      <section className="game">
        {
          isWordsLoad
            ? <Loader></Loader>
            : ''
        }
        {
          amountMistakes >= MAX_MISTAKES_OF_AUDIO_GAMES
            ? <Table stat={statistic} />
            : (group !== undefined
              ? <div className="game__audioCall">
                <Progress
                  className="game__audioCall_progress"
                  amountMistakes={amountMistakes} />
                <CardOfAudio
                  content={contentForCard}
                  getResult={getResultOneStepGame}
                  setMistakes={setAmountMistakes} />
              </div>
              : <LevelPanel
                setGroup={setGroup}
              />)
        }

        <Button
          className='game__cress'
          onClick={() => ''}>
          <Link title={'Закрыть игру и перейти на главную страницу'} to='/home'><NoLogo /></Link >
        </Button>
      </section>
    </>
  );
};

export default AudioCallGame;