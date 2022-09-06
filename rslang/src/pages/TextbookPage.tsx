import { useContext, useEffect, useState } from 'react';
import { getAllUserAggregatedWords, getUserWord, getWords } from '../components/API/API';
import Footer from '../components/UI/Footer/Footer';
import Header from '../components/UI/Header/Header';
import Loader from '../components/UI/Loader/Loader';
import MainTexbook from '../components/UI/MainTexbook/MainTexbook';
import MenuTextbook from '../components/UI/MenuTextbook/MenuTextbook';
import { NUMBER_OF_SECTIONS_IN_TEXTBOOK } from '../constants/constants';
import { MyContext } from '../context/context';
import { useFetch } from '../hooks/useFetch';
import { IAgregateWords, IDifficulty, IFullWordsForBook, IOptionalProgress, IPropertyWord, IWords, LocationState } from '../types/types';

const PageСollectorTextbook = () => {

  // const [words, setWords] = useState<IWords[]>([]);
  const [fullWords, setFullWords] = useState<IFullWordsForBook[]>([]);
  const [cologBgCard, setCologBgCard] = useState('#4640BE')
  const [fetchWords, isWordsLoad, wordsError] = useFetch(getWordsForMain)

  const [group, setGroup] = useState<number>(() => {
    const local: LocationState = (JSON.parse(window.sessionStorage.getItem('ps0m-textBook') || '{}'))

    return local.group ? local.group : 0
  });

  const [page, setPage] = useState<number>(() => {
    const local: LocationState = (JSON.parse(window.sessionStorage.getItem('ps0m-textBook') || '{}'))

    return local.page ? local.page : 0
  });

  const { isAuth } = useContext(MyContext)

  useEffect(() => {
    fetchWords()
  }, [group, page])


  async function getWordsForMain() {
    let wordMain: IWords[] = []

    if (group < NUMBER_OF_SECTIONS_IN_TEXTBOOK) {
      wordMain = [...await getWords(group, page)]
    } else if (isAuth) {
      const filterAllDifficultWords = { "$and": [{ "userWord.difficulty": "hard" }] }
      const difficultWordsAnswer: IAgregateWords[] = await getAllUserAggregatedWords(isAuth.userId, 100, filterAllDifficultWords, isAuth.token)

      const difficultWords: IFullWordsForBook[] = difficultWordsAnswer[0].paginatedResults.map(word => {
        const newWordId = word._id ? word._id : ''

        return {
          word: { ...word, id: newWordId },
          difficult: word.userWord.difficulty,
          learned: word.userWord.optional.learned,
          progress: word.userWord.optional.progress
        }
      });

      setFullWords(difficultWords);
      console.log('sep', difficultWordsAnswer);
      return
    }

    if (!isAuth) {
      const faceFullWords: IFullWordsForBook[] = wordMain.map(word => {
        return {
          word: word,
          difficult: IDifficulty.easy,
          learned: false,
          progress: { index: 0 }
        }
      })

      setFullWords([...faceFullWords])
      return
    }

    const filterDifficult = { "$and": [{ "group": group }, { "page": page }, { "userWord.difficulty": "hard" }] }
    const filterLearned = { "$and": [{ "group": group }, { "page": page }, { "userWord.optional.learned": true }] }
    const filterProgress = {
      "$and": [{ "group": group }, { "page": page }, {
        "$or": [{ "userWord.optional.progress.index": 1 },
        { "userWord.optional.progress.index": 2 }, { "userWord.optional.progress.index": 3 }, { "userWord.optional.progress.index": 4 }]
      }]
    }

    const difficultWordsAnswer: IAgregateWords[] = await getAllUserAggregatedWords(isAuth.userId, 20, filterDifficult, isAuth.token)
    const learnedWordsAnswer: IAgregateWords[] = await getAllUserAggregatedWords(isAuth.userId, 20, filterLearned, isAuth.token)
    const wordsWithProgressAnswer = await getAllUserAggregatedWords(isAuth.userId, 20, filterProgress, isAuth.token)


    const difficultWords = difficultWordsAnswer[0].paginatedResults;
    const learnedWords = learnedWordsAnswer[0].paginatedResults;
    const wordsWithProgress = wordsWithProgressAnswer[0].paginatedResults;

    const progressForWordsPromises = []

    for (let i = 0; i < wordsWithProgress.length; i++) {
      progressForWordsPromises.push(getUserWord(isAuth.userId, wordsWithProgress[i]._id, isAuth.token))
    }
    const progressForWords: IPropertyWord[] = await Promise.all(progressForWordsPromises)

    const allWords: IFullWordsForBook[] = wordMain.map(oneWord => {
      let isDifficult: IDifficulty = IDifficulty.easy;
      let isLearned = false;
      let progress: IOptionalProgress = { index: 0 };

      for (const item of difficultWords) {
        if (item.word === oneWord.word) {
          isDifficult = IDifficulty.hard
          break;
        }
      }

      for (const item of learnedWords) {
        if (item.word === oneWord.word) {
          isLearned = true;
          break;
        }
      }

      for (let i = 0; i < wordsWithProgress.length; i++) {
        if (wordsWithProgress[i].word === oneWord.word) {
          progress = progressForWords[i].optional.progress
          break;
        }
      }

      return {
        word: oneWord,
        difficult: isDifficult,
        learned: isLearned,
        progress: progress
      }
    })

    setFullWords(allWords);

  }


  useEffect(() => {
    window.onbeforeunload = () => {
      console.log(group, page);
      window.sessionStorage.setItem('ps0m-textBook', JSON.stringify({ group: group, page: page }))
    }

    return window.onbeforeunload = () => {
      console.log(group, page);
      window.sessionStorage.setItem('ps0m-textBook', JSON.stringify({ group: group, page: page }))
    }
  }, [group, page])

  useEffect(() => {
    const local: LocationState = (JSON.parse(window.sessionStorage.getItem('ps0m-textBook') || '{}'))

    local.group ? setGroup(local.group) : setGroup(0)
    local.page ? setPage(local.page) : setPage(0)

  }, [])

  return (
    isWordsLoad
      ? <Loader />
      : <>
        <Header />
        <MenuTextbook
          setGroup={setGroup}
          setPage={setPage}
          setCologBgCard={setCologBgCard}
          numberPage={page}
          numberGroup={group} />
        <MainTexbook
          words={fullWords}
          style={cologBgCard} />
        <Footer />
      </>
  );
}

export default PageСollectorTextbook;