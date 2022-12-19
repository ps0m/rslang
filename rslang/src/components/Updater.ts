import { AMOUNT_VARIANTS_OF_AUDIO_GAMES } from '../constants/constants'
import { getCurrentDate, getMaxSeries, shuffleArray } from '../helpers/helpers'
import {
  IAuth,
  IContentForAudio,
  ICustomStat,
  IDifficulty,
  IElemOptionalProgress,
  IGameDailyStatisticKey,
  IPropertyWord,
  IStatistic,
  IWords
} from '../types/types'
import {
  createUserWord,
  getAllUserWords,
  getUserStatistics,
  getUserWord,
  updateUserStatistics,
  updateUserWord
} from './API/API'

// const amountLearned = 0

export const getOrderRandomWords = (
  initWords: IWords[],
  currWords: IWords[],
): IContentForAudio | null => {
  const randomIndexWordStudy = Math.floor(Math.random() * currWords.length)
  const randomWordStudy = currWords[randomIndexWordStudy]
  const randomExtraWords: IWords[] = []

  randomExtraWords.push(randomWordStudy)

  for (let i = 1; i < AMOUNT_VARIANTS_OF_AUDIO_GAMES; i++) {
    // const randomIndexExtraWords = Math.floor(Math.random() * initWords.length)
    let randomIndexExtraWords: number;

    do {
      randomIndexExtraWords = Math.floor(Math.random() * initWords.length)
    } while (randomExtraWords.includes(initWords[randomIndexExtraWords]))

    randomExtraWords.push(initWords[randomIndexExtraWords])
  }

  return {
    wordStudy: randomWordStudy,
    extraWords: shuffleArray(randomExtraWords),
    currentIndex: randomIndexWordStudy,
  }
}

export const getRandomWord = (initWords: IWords[], currWords: IWords[]) => {
  const randomIndex = Math.floor(Math.random() * currWords.length)
  const randomWord = currWords[randomIndex]
  const isWillBeEqual = !!Math.floor(Math.random() * 2)
  let randomWordForTranslate: IWords

  if (!isWillBeEqual) {
    do {
      randomWordForTranslate = initWords[Math.floor(Math.random() * initWords.length)]
    } while (randomWord === randomWordForTranslate)
  } else randomWordForTranslate = randomWord

  return {
    word: randomWord,
    translate: randomWordForTranslate,
    isEqual: isWillBeEqual,
    currentIndex: randomIndex,
  }
}

interface IUpdateOneUserWord {
  isAuth: IAuth
  wordOfStat: ICustomStat
}

const updateOneUserWord = async ({ isAuth, wordOfStat }: IUpdateOneUserWord) => {
  try {
    const currentUserWord: IPropertyWord = await getUserWord(
      isAuth.userId,
      wordOfStat.word.id,
      isAuth.token,
    )
    const progressIndex = currentUserWord.optional.progress.index
    const newLearned = checkLearned({ currentUserWord, wordOfStat })
    const newDifficulty = newLearned ? IDifficulty.easy : currentUserWord.difficulty

    const newProgress =
      progressIndex < 4
        ? {
          ...currentUserWord.optional.progress,
          index: progressIndex + 1,
          [progressIndex + 1]: wordOfStat.isRight,
        }
        : {
          index: progressIndex,
          0: currentUserWord.optional.progress[1],
          1: currentUserWord.optional.progress[2],
          2: currentUserWord.optional.progress[3],
          3: currentUserWord.optional.progress[4],
          4: wordOfStat.isRight,
        }

    const updatedCurrentUserWord: IPropertyWord = {
      difficulty: newDifficulty,
      optional: {
        id: wordOfStat.word.id,
        isNew: false,
        learned: newLearned,
        progress: newProgress,
      },
    }

    updateUserWord(isAuth.userId, wordOfStat.word.id, updatedCurrentUserWord, isAuth.token)

    return { last: currentUserWord, updated: updatedCurrentUserWord }
  } catch (e: unknown) {
    if (typeof e === 'string') {
      console.log(e)
      // return e
    } else if (e instanceof Error) {
      console.log(e.message)
      // return e.message;
    }
  }
}

interface ICheckLearned {
  currentUserWord: IPropertyWord
  wordOfStat: ICustomStat
}

const checkLearned = ({ currentUserWord, wordOfStat }: ICheckLearned) => {
  const progressIndex: keyof IElemOptionalProgress = currentUserWord.optional.progress.index

  if (!wordOfStat.isRight || progressIndex < 1) {
    return false
  }

  const progress = currentUserWord.optional.progress

  if (currentUserWord.difficulty === IDifficulty.hard) {
    return progressIndex < 3
      ? false
      : !!progress[0] && !!progress[1] && !!progress[2] && !!progress[3]
  }

  return !!progress[0] && !!progress[1]
}

interface IDivisionCurrentStatistic {
  isAuth: IAuth | null
  currentStatistic: ICustomStat[] | null
}

const divisionCurrentStatistic = async ({
  isAuth,
  currentStatistic,
}: IDivisionCurrentStatistic) => {
  try {
    if (isAuth !== null && currentStatistic !== null) {
      const allUserWords: IPropertyWord[] = await getAllUserWords(isAuth?.userId, isAuth?.token)
      const newUserWords: ICustomStat[] = []
      const oldUserWords: ICustomStat[] = []

      if (allUserWords.length === 0) {
        newUserWords.splice(0, 0, ...currentStatistic)
      } else {
        labelFor: for (const wordOfStatistic of currentStatistic) {
          for (const wordOfUser of allUserWords) {
            if (wordOfStatistic.word.id === wordOfUser.optional.id) {
              oldUserWords.push(wordOfStatistic)
              continue labelFor
            }
          }

          newUserWords.push(wordOfStatistic)
        }
      }

      return [newUserWords, oldUserWords]
    } else return []
  } catch (e: unknown) {
    if (typeof e === 'string') {
      // return e
    } else if (e instanceof Error) {
      // return e.message;
    }
  }
}

interface ICreateNewStatistic {
  currentStatistic: ICustomStat[]
  oldStatistics: IStatistic
  newUserWords: ICustomStat[]
  currentGame: IGameDailyStatisticKey
  amountLearned: number
}

const createNewStatistic = ({
  currentStatistic,
  oldStatistics,
  newUserWords,
  currentGame,
  amountLearned,
}: ICreateNewStatistic) => {
  const notCurrentGame: IGameDailyStatisticKey = currentGame === 'audio' ? 'sprint' : 'audio'
  const amountNewWords = newUserWords.length
  const totalAnswer = currentStatistic.length
  const rightAnswer = currentStatistic.filter((item) => item.isRight).length
  const maxSeries = getMaxSeries(currentStatistic)

  const sprintIfCurrentDateContent =
    currentGame === 'audio'
      ? {
        ...oldStatistics.optional.daily[notCurrentGame],
      }
      : {
        newWords: oldStatistics.optional.daily[currentGame].newWords + amountNewWords,
        totalAnswer: oldStatistics.optional.daily[currentGame].totalAnswer + totalAnswer,
        rightAnswer: oldStatistics.optional.daily[currentGame].rightAnswer + rightAnswer,
        maxSeries: Math.max(oldStatistics.optional.daily[currentGame].maxSeries, maxSeries),
      }

  const audioIfCurrentDateContent =
    currentGame === 'sprint'
      ? {
        ...oldStatistics.optional.daily[notCurrentGame],
      }
      : {
        newWords: oldStatistics.optional.daily[currentGame].newWords + amountNewWords,
        totalAnswer: oldStatistics.optional.daily[currentGame].totalAnswer + totalAnswer,
        rightAnswer: oldStatistics.optional.daily[currentGame].rightAnswer + rightAnswer,
        maxSeries: Math.max(oldStatistics.optional.daily[currentGame].maxSeries, maxSeries),
      }

  const statIfCurrentDate: IStatistic = {
    learnedWords: 0,
    optional: {
      daily: {
        sprint: sprintIfCurrentDateContent,
        audio: audioIfCurrentDateContent,
        words: {
          newWords: oldStatistics.optional.daily.words.newWords + amountNewWords,
          learnedWords: oldStatistics.optional.daily.words.learnedWords + amountLearned,
          totalAnswer: oldStatistics.optional.daily.words.totalAnswer + totalAnswer,
          rightAnswer: oldStatistics.optional.daily.words.rightAnswer + rightAnswer,
        },
        date: oldStatistics.optional.daily.date,
      },
      longTerm: {
        ...oldStatistics.optional.longTerm,
        [oldStatistics.optional.daily.date]: {
          newLearnedWords:
            oldStatistics.optional.longTerm[oldStatistics.optional.daily.date].newLearnedWords +
            amountNewWords,
          totalLearnedWords:
            oldStatistics.optional.longTerm[oldStatistics.optional.daily.date].totalLearnedWords +
            amountLearned,
        },
      },
    },
  }

  const sprintIfNewDateContent =
    currentGame === 'audio'
      ? {
        ...oldStatistics.optional.daily.sprint,
      }
      : {
        newWords: 0 + amountNewWords,
        totalAnswer: 0 + totalAnswer,
        rightAnswer: 0 + rightAnswer,
        maxSeries: maxSeries,
      }

  const audioIfNewDateContent =
    currentGame === 'sprint'
      ? {
        ...oldStatistics.optional.daily.audio,
      }
      : {
        newWords: 0 + amountNewWords,
        totalAnswer: 0 + totalAnswer,
        rightAnswer: 0 + rightAnswer,
        maxSeries: maxSeries,
      }

  const statIfNewDate: IStatistic = {
    learnedWords: 0,
    optional: {
      daily: {
        sprint: { ...sprintIfNewDateContent },
        audio: { ...audioIfNewDateContent },
        words: {
          newWords: amountNewWords,
          learnedWords: amountLearned,
          totalAnswer: totalAnswer,
          rightAnswer: rightAnswer,
        },
        date: getCurrentDate(),
      },
      longTerm: {
        ...oldStatistics.optional.longTerm,
        [getCurrentDate()]: {
          newLearnedWords: 0,
          totalLearnedWords:
            oldStatistics.optional.longTerm[oldStatistics.optional.daily.date].totalLearnedWords,
        },
      },
    },
  }

  const newStat: IStatistic =
    oldStatistics.optional.daily.date === getCurrentDate() ? statIfCurrentDate : statIfNewDate

  return newStat
}

interface IUpdateAfterGame {
  isAuth: IAuth | null
  currentStatistic: ICustomStat[] | null
  currentGame: IGameDailyStatisticKey
}

export const updateAfterGame = async ({
  isAuth,
  currentStatistic,
  currentGame,
}: IUpdateAfterGame) => {
  try {
    if (isAuth !== null && currentStatistic !== null) {
      const responseTwoUserWords = await divisionCurrentStatistic({ isAuth, currentStatistic })

      if (responseTwoUserWords === undefined) {
        return
      }

      const [newUserWords, oldUserWords] = responseTwoUserWords

      const oldStatistics: IStatistic = await getUserStatistics(isAuth.userId, isAuth.token)


      const responseUpdateUserWords: Promise<
        { last: IPropertyWord; updated: IPropertyWord } | undefined
      >[] = oldUserWords.map((wordOfStat) => {
        return updateOneUserWord({ isAuth, wordOfStat })
      })

      let amountLearned = 0

      for await (const iterator of responseUpdateUserWords) {
        if (iterator === undefined) return

        if (
          iterator.last.optional.learned === false &&
          iterator.updated.optional.learned === true
        ) {
          amountLearned++
        }

        if (
          iterator.last.optional.learned === true &&
          iterator.updated.optional.learned === false
        ) {
          amountLearned--
        }
      }

      responseUpdateUserWords

      // createOneUserWord
      newUserWords.forEach((word) => {
        createUserWord(
          isAuth.userId,
          word.word.id,
          {
            difficulty: IDifficulty.easy,
            optional: {
              id: word.word.id,
              isNew: true,
              learned: false,
              progress: { index: 0, 0: word.isRight },
            },
          },
          isAuth.token,
        )
      })

      const newStatistic: IStatistic = createNewStatistic({
        currentStatistic,
        oldStatistics,
        newUserWords,
        currentGame,
        amountLearned,
      })


      await updateUserStatistics(isAuth.userId, newStatistic, isAuth.token)
    }
  } catch (e: unknown) {
    if (typeof e === 'string') {
      console.log(e)
      return e
    } else if (e instanceof Error) {
      console.log(e.message)
      return e.message
    }
  }
}
