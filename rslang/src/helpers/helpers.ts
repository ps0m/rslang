import { IAuth, ICustomStat, IStatistic } from '../types/types'

export const getCoefficient = (rightAnswer: number) => {
  switch (Math.floor(rightAnswer / 4)) {
    case 0:
      return 1
    case 1:
      return 2
    case 2:
      return 4
    default:
      return 8
  }
}

export const shuffleArray = <T>(initialArray: T[]): T[] => {
  const resultArray = initialArray.slice()

  for (let i = 0; i < resultArray.length; i++) {
    const current = resultArray[i]
    const randomIndex = Math.floor(Math.random() * (resultArray.length - 1))

    resultArray[i] = resultArray[randomIndex]
    resultArray[randomIndex] = current
  }

  return resultArray
}

export const InitialisAuth: () => IAuth | null = () => {
  const local = localStorage.getItem('rslang-ps0m')

  const init: IAuth | null = local !== null ? JSON.parse(local) : null

  return init
}

export const getMaxSeries = (array: ICustomStat[]) => {
  let maxSeries = 0
  let currentSeries = 0

  for (let i = 0; i < array.length; i++) {
    if (array[i].isRight) {
      currentSeries++
    } else {
      maxSeries = Math.max(maxSeries, currentSeries)
      currentSeries = 0
    }
  }

  return maxSeries
}

export const getCurrentDate = () => {
  const f = new Date()

  // console.log(f, [f.getFullYear(), f.getMonth(), f.getDate()].join('_'), 'today');

  return [f.getFullYear(), f.getMonth(), f.getDate()].join('_')
  // return "2022_8_3"
}

export const initialStatistic: IStatistic = {
  learnedWords: 0,
  optional: {
    daily: {
      sprint: {
        newWords: 0,
        totalAnswer: 0,
        rightAnswer: 0,
        maxSeries: 0,
      },
      audio: {
        newWords: 0,
        totalAnswer: 0,
        rightAnswer: 0,
        maxSeries: 0,
      },
      words: {
        newWords: 0,
        learnedWords: 0,
        totalAnswer: 0,
        rightAnswer: 0,
      },
      date: getCurrentDate(),
    },
    longTerm: {
      [getCurrentDate()]: {
        newLearnedWords: 0,
        totalLearnedWords: 0,
      },
    },
  },
}
