import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createUserWord, getAllUserWords, getUserWord, getWords, updateUserWord } from "../components/API/API";
import Button from "../components/UI/Button/Button";
import CardOfAudio from "../components/UI/CardOfAudio/CardOfAudio";
import Header from "../components/UI/Header/Header";
import LevelPanel from "../components/UI/LevelPanel/LevelPanel";
import Loader from "../components/UI/Loader/Loader";
import Progress from "../components/UI/Progress/Progress";
import { ReactComponent as NoLogo } from "../components/UI/Table/assets/x_circle.svg";
import Table from "../components/UI/Table/Table";
import { AMOUNT_VARIANTS_OF_AUDIO_GAMES, MAX_MISTAKES_OF_AUDIO_GAMES } from "../constants/constatnts";
import { MyContext } from "../context/context";
import { shuffleArray } from "../helpers/helpers";
import { useFetch } from "../hooks/useFetch";
import { IContentForAudio, ICustomStat, IDifficulty, IElemOptionalProgress, IPropertyWord, IWords } from "../types/types";

const AudioCallGame = () => {
  const [group, setGroup] = useState<number | undefined>();
  const [initialWords, setInitialWords] = useState<IWords[]>([]);
  const [currentWords, setCurrentWords] = useState<IWords[]>([]);
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

  const getOrderRandomWords = (initWords: IWords[], currWords: IWords[]) => {
    if (initWords.length === 0) {
      return
    }

    const randomIndexWordStudy = Math.floor(Math.random() * currWords.length)
    const randomWordStudy = currWords[randomIndexWordStudy]
    const randomExtraWords: IWords[] = []

    randomExtraWords.push(randomWordStudy);

    for (let i = 1; i < AMOUNT_VARIANTS_OF_AUDIO_GAMES; i++) {
      let randomIndexExtraWords

      do {
        randomIndexExtraWords = Math.floor(Math.random() * initWords.length)

      } while (randomExtraWords.includes(initWords[randomIndexExtraWords]));

      randomExtraWords.push(initWords[randomIndexExtraWords])
    }

    setContentForCard({
      wordStudy: randomWordStudy,
      extraWords: shuffleArray(randomExtraWords),
      currentIndex: randomIndexWordStudy
    });
  }

  const updateCurrentStatistic = (newItem: ICustomStat) => {
    currentStatistic === null
      ? setCurrentStatistic([newItem])
      : setCurrentStatistic([...currentStatistic, newItem])
  }

  const getResultOneStepGame = (newItem: ICustomStat) => {
    updateCurrentStatistic(newItem);
  }

  const updateOneUserWord = async (wordOfStat: ICustomStat) => {
    try {
      if (isAuth !== null && currentStatistic !== null) {
        const currentUserWord: IPropertyWord = await getUserWord(isAuth.userId, wordOfStat.word.id, isAuth.token)
        const progressIndex = currentUserWord.optional.progress.index;
        const newLearned = checkLearned(currentUserWord, wordOfStat);
        const newDifficulty = newLearned ? IDifficulty.easy : currentUserWord.difficulty;

        const newProgress = progressIndex < 4
          ? ({
            ...currentUserWord.optional.progress,
            index: progressIndex + 1,
            [progressIndex + 1]: wordOfStat.isRight
          })
          : ({
            index: progressIndex,
            0: currentUserWord.optional.progress[1],
            1: currentUserWord.optional.progress[2],
            2: currentUserWord.optional.progress[3],
            3: currentUserWord.optional.progress[4],
            4: wordOfStat.isRight
          })

        updateUserWord(
          isAuth.userId,
          wordOfStat.word.id,
          {
            difficulty: newDifficulty,
            optional: {
              id: wordOfStat.word.id,
              isNew: false,
              learned: newLearned,
              progress: newProgress
            }
          },
          isAuth.token)
      }
    } catch (e: unknown) {
      if (typeof e === "string") {
        setError(e)
      } else if (e instanceof Error) {
        setError(e.message);
      }
    }
  }

  const checkLearned = (currenWord: IPropertyWord, wordOfStat: ICustomStat) => {
    const progressIndex: keyof IElemOptionalProgress = currenWord.optional.progress.index;

    if (!wordOfStat.isRight || progressIndex < 1) {
      return false
    }

    const progress = currenWord.optional.progress

    if (currenWord.difficulty === IDifficulty.hard) {
      return progressIndex < 3
        ? false
        : !!progress[0] && !!progress[1] && !!progress[2] && !!progress[3]
    }

    return !!progress[0] && !!progress[1]
  }

  const updateGlobalStatistic = async () => {
    try {
      if (isAuth !== null && currentStatistic !== null) {
        const allUserWords: IPropertyWord[] = await getAllUserWords(isAuth?.userId, isAuth?.token)
        const newUserWords: ICustomStat[] = [];
        const oldUserWords: ICustomStat[] = [];

        if (allUserWords.length === 0) {
          newUserWords.splice(0, 0, ...currentStatistic);
        } else {

          labelFor: for (const wordOfStatistic of currentStatistic) {
            for (const wordOfUser of allUserWords) {
              if (wordOfStatistic.word.id === wordOfUser.optional.id) {
                oldUserWords.push(wordOfStatistic);
                continue labelFor;
              }
            }

            newUserWords.push(wordOfStatistic);
          }
        }

        console.log(currentStatistic, allUserWords, newUserWords, oldUserWords);
        oldUserWords.forEach(word => {
          updateOneUserWord(word);
        })

        // createOneUserWord
        newUserWords.forEach(word => {
          createUserWord(
            isAuth.userId,
            word.word.id, {
            difficulty: IDifficulty.easy,
            optional: {
              id: word.word.id,
              isNew: true,
              learned: false,
              progress: { index: 0, 0: word.isRight }
            }
          },
            isAuth.token)
        })

      }
    } catch (e: unknown) {
      if (typeof e === "string") {
        setError(e)
      } else if (e instanceof Error) {
        setError(e.message);
      }
    }
  }

  useEffect(() => {
    if (amountMistakes >= MAX_MISTAKES_OF_AUDIO_GAMES && isAuth !== null) {
      setIsFinishGame(true);
      updateGlobalStatistic();
    }
  }, [amountMistakes])

  useEffect(() => {
    if (currentStatistic !== null
      && contentForCard !== null
      && currentWords !== null) {

      const newWords = [...currentWords.slice(0, contentForCard?.currentIndex), ...currentWords.slice(contentForCard?.currentIndex + 1)]

      console.log(newWords);

      if (newWords.length === 0) {
        setIsFinishGame(true);
      }

      setCurrentWords(newWords);
    }
  }, [currentStatistic])


  useEffect(() => {
    if (initialWords !== undefined) {
      getOrderRandomWords(initialWords, currentWords);
    }
  }, [initialWords, currentWords])



  return (
    <>
      <Header />
      <section className="game">
        {
          isWordsLoad
            ? <Loader></Loader>
            : ''
        }
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
    </>
  );
};

export default AudioCallGame;


