/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAllUserAggregatedWords, getWords } from "../components/API/API";
import Button from "../components/UI/Button/Button";
import CardOfSprint from "../components/UI/CardOfSprint/CardOfSprint";
import Header from "../components/UI/Header/Header";
import LevelPanel from "../components/UI/LevelPanel/LevelPanel";
import Loader from "../components/UI/Loader/Loader";
import { ReactComponent as NoLogo } from "../components/UI/Table/assets/x_circle.svg";
import Table from "../components/UI/Table/Table";
import { getRandomWord, updateAfterGame } from "../components/Updater";
import { PAGES_PER_GROUP } from "../constants/constants";
import { MyContext } from "../context/context";
import { getCoefficient } from "../helpers/helpers";
import { useFetch } from "../hooks/useFetch";
import { IAgregateWords, IContentForSprintCard, ICustomStat, IScore, IWords, LocationState } from "../types/types";


const SprintGame = () => {
  const [group, setGroup] = useState<number | null>(null);
  const [page, setPage] = useState<number | null>(null);
  const [initialWords, setInitialWords] = useState<IWords[]>([]);
  const [currentWords, setCurrentWords] = useState<IWords[]>([]);
  const [contentForCard, setContentForCard] = useState<IContentForSprintCard | null>(null);
  const [score, setScore] = useState<IScore>({ amount: 0, rightAnswer: 0, coefficient: 1 });
  const [currentStatistic, setCurrentStatistic] = useState<ICustomStat[] | null>(null);
  const [isFinishGame, setIsFinishGame] = useState<boolean>(false);
  const [fetchWordsFromMenu, isWordsLoadFromMenu, wordsErrorFromMenu] = useFetch(getWordsForGameFromMenu)
  const [fetchWordsFromBook, isWordsLoadFromBook, wordsErrorFromBook] = useFetch(getWordsForGameFromBook)
  const [error, setError] = useState<string | null>(null);

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

      if (words) {
        setCurrentWords(words)
        setInitialWords(words)
      }
    }

  }

  async function getWordsForGameFromMenu() {
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



  const updateScore = (newItem: ICustomStat) => {
    newItem.isRight
      ? setScore({
        amount: (score.amount + 10 * score.coefficient),
        rightAnswer: (score.rightAnswer + 1),
        coefficient: getCoefficient(score.rightAnswer + 1)
      })
      : setScore({
        amount: score.amount,
        rightAnswer: 0,
        coefficient: 1
      })
  }


  const updateCurrentStatistic = (newItem: ICustomStat) => {
    currentStatistic === null
      ? setCurrentStatistic([newItem])
      : setCurrentStatistic([...currentStatistic, newItem])
  }

  const getResultOneStepGame = (newItem: ICustomStat) => {
    updateScore(newItem);
    updateCurrentStatistic(newItem);
  }

  const checkErrorFromUpdate = async () => {

    const isError = await updateAfterGame({ isAuth, currentStatistic, currentGame: 'sprint' })

    if (isError !== undefined) {
      setError(isError);
    }
  }

  useEffect(() => {

    if (isAuth !== null) {
      checkErrorFromUpdate();
    }
  }, [isFinishGame])

  useEffect(() => {
    if (currentStatistic !== null
      && contentForCard !== null
      && currentWords !== null) {

      const newWords = [...currentWords.slice(0, contentForCard?.currentIndex), ...currentWords.slice(contentForCard?.currentIndex + 1)]

      if (newWords.length === 0) {
        if (page) {
          setPage(page - 1)
        } else {
          setIsFinishGame(true);
        }
      }

      setCurrentWords(newWords);
    }
  }, [currentStatistic])


  useEffect(() => {
    if (initialWords.length !== 0 && currentWords.length !== 0) {
      setContentForCard(getRandomWord(initialWords, currentWords));
    }
  }, [initialWords, currentWords])


  return (
    <>
      <Header />
      {
        isWordsLoadFromMenu || isWordsLoadFromBook
          ? <Loader></Loader>
          : <section className="game">
            {
              isFinishGame
                ? <>
                  <Table stat={currentStatistic} >
                    <>Ваш результат: {score.amount} баллов</>
                  </Table>
                </>
                : (group !== null
                  ? <CardOfSprint
                    content={contentForCard}
                    score={score}
                    setIsFinishGame={setIsFinishGame}
                    getResult={getResultOneStepGame} />
                  : <LevelPanel
                    setGroup={setGroup}
                  />)
            }
            <Button
              className='game__cress'
              onClick={() => ''}>
              <Link to='/home'><NoLogo /></Link >
            </Button>
          </section>
      }

    </>
  );
};

export default SprintGame;
