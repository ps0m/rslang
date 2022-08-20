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

export interface IPropertyWord {
  difficulty: string,
  // "optional": {}
}

export interface IStatistic {
  learnedWords: number,
  // "optional": {}
}

export interface ISettings {
  "wordsPerDay": number
  // "optional": { }
}