import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWords } from "../components/API/API";
import Button from "../components/UI/Button/Button";
import CardOfAudio from "../components/UI/CardOfAudio/CardOfAudio";
import Header from "../components/UI/Header/Header";
import LevelPanel from "../components/UI/LevelPanel/LevelPanel";
import Loader from "../components/UI/Loader/Loader";
import Progress from "../components/UI/Progress/Progress";
import { ReactComponent as NoLogo } from "../components/UI/Table/assets/x_circle.svg";
import Table from "../components/UI/Table/Table";
import { getOrderRandomWords, updateAfterGame } from "../components/Updater";
import { MAX_MISTAKES_OF_AUDIO_GAMES } from "../constants/constatnts";
import { MyContext } from "../context/context";
import { useFetch } from "../hooks/useFetch";
import { IContentForAudio, ICustomStat, IWords } from "../types/types";

const AudioCallGame = () => {
  const [group, setGroup] = useState<number | undefined>();
  const [initialWords, setInitialWords] = useState<IWords[] | null>(null);
  const [currentWords, setCurrentWords] = useState<IWords[] | null>([]);
  const [contentForCard, setContentForCard] = useState<IContentForAudio | null>(null);
  const [currentStatistic, setCurrentStatistic] = useState<ICustomStat[] | null>(null);
  const [amountMistakes, setAmountMistakes] = useState<number>(0);
  const [fetchWords, isWordsLoad, wordsError] = useFetch(getWordsForGame)
  const [error, setError] = useState<string | null>(null);
  const [isWinishGame, setIsFinishGame] = useState<boolean>(false)

  const { isAuth } = useContext(MyContext)

  async function getWordsForGame(): Promise<void> {
    if (group === undefined) {
      return
    }
    const arrayPromisesWord = [];

    // Раскоментировать после отладки
    // for (let i = 0; i < PAGES_PER_GROUP; i++) {
    for (let i = 0; i < 1; i++) {
      arrayPromisesWord.push(getWords(group, i))
    }

    const allWordsOfgroup = await Promise.all(arrayPromisesWord)

    setInitialWords(allWordsOfgroup.flat())
    setCurrentWords(allWordsOfgroup.flat())
  }

  useEffect(() => {
    fetchWords();
  }, [group])


  const updateCurrentStatistic = (newItem: ICustomStat) => {
    currentStatistic === null
      ? setCurrentStatistic([newItem])
      : setCurrentStatistic([...currentStatistic, newItem])
  }

  const getResultOneStepGame = (newItem: ICustomStat) => {
    updateCurrentStatistic(newItem);
  }

  const checkErrorFromUpdate = async () => {

    const isError = await updateAfterGame({ isAuth, currentStatistic, currentGame: 'audio' })

    if (isError !== undefined) {
      setError(isError);
    }
  }

  useEffect(() => {
    if (amountMistakes >= MAX_MISTAKES_OF_AUDIO_GAMES) {
      setIsFinishGame(true);
      if (isAuth !== null) {
        checkErrorFromUpdate();
      }
    }
  }, [amountMistakes])

  useEffect(() => {
    if (currentStatistic !== null
      && contentForCard !== null
      && currentWords !== null) {

      const newWords = [...currentWords.slice(0, contentForCard?.currentIndex), ...currentWords.slice(contentForCard?.currentIndex + 1)]

      if (newWords.length === 0) {
        setIsFinishGame(true);
      }

      setCurrentWords(newWords);
    }
  }, [currentStatistic])


  useEffect(() => {
    if (initialWords !== null && currentWords !== null) {
      setContentForCard(getOrderRandomWords(initialWords, currentWords));
    }
  }, [initialWords, currentWords])



  return (
    <>
      <Header />
      {
        isWordsLoad
          ? <Loader></Loader>
          : <section className="game">
            {
              isWinishGame
                ? <Table stat={currentStatistic} />
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
      }
    </>
  );
};

export default AudioCallGame;


