import { Dispatch, SetStateAction } from "react"

export interface IWords {
  id: string,
  group: 0,
  page: 0,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string
}

export interface IUser {
  name: string,
  email: string,
  password: string
}

export interface IEmailPassword {
  email: string,
  password: string
}

export interface IAuth {
  message: string,
  token: string,
  refreshToken: string,
  userId: string,
  name: string
}

export interface IElemOptionalProgress {
  // 0?: boolean
  // 1?: boolean
  // 2?: boolean
  // 3?: boolean
  // 4?: boolean
  [index: number]: boolean
}

export interface IOptionalProgress extends IElemOptionalProgress {
  index: keyof IElemOptionalProgress
}

export enum IDifficulty {
  hard = 'hard',
  easy = 'easy'
}

export interface IOptionalPropertyWord {
  id: string,
  isNew: boolean,
  learned: boolean,
  progress: IOptionalProgress,
}

export interface IPropertyWord {
  difficulty: IDifficulty,
  optional: IOptionalPropertyWord
}

export interface IStatistic {
  learnedWords: number,
  // "optional": {}
}

export interface ISettings {
  "wordsPerDay": number
  // "optional": { }
}

export interface ICustomStat {
  word: IWords,
  isRight: boolean,
  index: number
}

export interface IContentForCard {
  word: IWords,
  translate: string,
  isEqual: boolean,
  currentIndex: number
}

export interface IScore {
  amount: number,
  rightAnswer: number,
  coefficient: number
}

export interface IContentForAudio {
  wordStudy: IWords,
  extraWords: IWords[],
  currentIndex: number
}

export enum VariantsAudioGame {
  one = '1',
  two = '2',
  three = '3',
  four = '4',
  five = '5'
}

export interface IContext {
  isAuth: IAuth | null
  setIsAuth: Dispatch<SetStateAction<IAuth | null>>
}