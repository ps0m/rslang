/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAllUserAggregatedWords, getWords } from "../components/API/API";
import Button from "../components/UI/Button/Button";
import CardOfAudio from "../components/UI/CardOfAudio/CardOfAudio";
import Header from "../components/UI/Header/Header";
import LevelPanel from "../components/UI/LevelPanel/LevelPanel";
import Loader from "../components/UI/Loader/Loader";
import Progress from "../components/UI/Progress/Progress";
import { ReactComponent as NoLogo } from "../components/UI/Table/assets/x_circle.svg";
import Table from "../components/UI/Table/Table";
import { getOrderRandomWords, updateAfterGame } from "../components/Updater";
import { MAX_MISTAKES_OF_AUDIO_GAMES, PAGES_PER_GROUP } from "../constants/constants";
import { MyContext } from "../context/context";
import { useFetch } from "../hooks/useFetch";
import { IAgregateWords, IContentForAudio, ICustomStat, IWords, LocationState } from "../types/types";

const AudioCallGame = () => {
  const [group, setGroup] = useState<number | null>(null);
  const [page, setPage] = useState<number | null>(null);
  const [initialWords, setInitialWords] = useState<IWords[]>([]);
  const [currentWords, setCurrentWords] = useState<IWords[]>([]);
  const [contentForCard, setContentForCard] = useState<IContentForAudio | null>(null);
  const [currentStatistic, setCurrentStatistic] = useState<ICustomStat[] | null>(null);
  const [amountMistakes, setAmountMistakes] = useState<number>(0);
  const [fetchWordsFromMenu, isWordsLoadFromMenu, wordsErrorFromMenu] = useFetch(getWordsForGameFromMenu)
  const [fetchWordsFromBook, isWordsLoadFromBook, wordsErrorFromBook] = useFetch(getWordsForGameFromBook)
  const [error, setError] = useState<string | null>(null);
  const [isFinishGame, setIsFinishGame] = useState<boolean>(false)
  const [smallWords, setSmallWords] = useState<boolean>(false)
  const { isAuth } = useContext(MyContext)


  const locationState = useLocation().state as LocationState

  useEffect(() => {
    if (group !== null) {
      if (locationState.from === 'book') {
        fetchWordsFromBook()
      } else if (locationState.from === 'menu') {
        fetchWordsFromMenu();
      }
    }

  }, [group, page])

  useEffect(() => {
    if (locationState !== null) {

      setGroup(locationState.group)
      setPage(locationState.page)
    }
  }, [])


  const getUnLearnedWords = async () => {

    if (isAuth && group !== null && page !== null) {

      const filterLearned = { "$and": [{ "group": group }, { "page": page }, { "userWord.optional.learned": true }] }
      const learnedWords: IAgregateWords[] = await getAllUserAggregatedWords(isAuth.userId, 20, filterLearned, isAuth.token)

      const allWordsForPage = await getWords(group, page);

      const filterWordsForPage = allWordsForPage.filter(word => {

        for (let i = 0; i < learnedWords[0].paginatedResults.length; i++) {

          if (word.word === learnedWords[0].paginatedResults[i].word) {

            return false
          }
        }

        return true;
      })

      return filterWordsForPage
    }
  }

  async function getWordsForGameFromBook() {

    if (group !== null && page !== null) {
      const words: IWords[] | undefined = isAuth
        ? await getUnLearnedWords()
        : await getWords(group, page);

      // if (isAuth) {

      //   const words: IWords[] | undefined = await getUnLearnedWords();

      if (words) {


        setCurrentWords(prev => [...prev, ...words])
        setInitialWords(prev => [...prev, ...words])
        if (words.length < 6) {
          if (page !== null && page >= 0) {
            setPage(page - 1)

          }
        }
      }
    }
  }


  useEffect(() => {

    if (page !== null && page < 0 && initialWords.length < 5) {

      setSmallWords(true);
    }
  }, [page, initialWords])




  async function getWordsForGameFromMenu(): Promise<void> {
    if (group !== null) {
      const arrayPromisesWord = [];

      for (let i = 0; i < PAGES_PER_GROUP; i++) {
        arrayPromisesWord.push(getWords(group, i))
      }

      const allWordsOfgroup = await Promise.all(arrayPromisesWord)

      setInitialWords(allWordsOfgroup.flat())
      setCurrentWords(allWordsOfgroup.flat())
    }

  }


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
        if (page !== null && page >= 0) {
          setPage(page - 1)
        } else {
          setIsFinishGame(true);
        }
      }

      setCurrentWords(newWords);
    }
  }, [currentStatistic])


  useEffect(() => {
    if (initialWords.length !== 0 && currentWords.length !== 0 && initialWords.length > 4) {

      setContentForCard(getOrderRandomWords(initialWords, currentWords));
    }
  }, [initialWords, currentWords])



  return (
    <>
      <Header />
      {
        isWordsLoadFromBook || isWordsLoadFromMenu
          ? <Loader></Loader>
          : <section className="game">
            {
              isFinishGame || smallWords
                ? <Table stat={currentStatistic} />
                : (group !== null
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


