import Footer from '../components/UI/Footer/Footer';
import Header from '../components/UI/Header/Header';
import MainTexbook from '../components/UI/MainTexbook/MainTexbook';
import MenuTextbook from '../components/UI/MenuTextbook/MenuTextbook';

import { useContext, useEffect, useState } from 'react';
import { getAllUserAggregatedWords, getUserWord, getWords } from '../components/API/API';
import Loader from '../components/UI/Loader/Loader';
import { MyContext } from '../context/context';
import { useFetch } from '../hooks/useFetch';
import { IAgregateWords, IDifficulty, IFullWordsForBook, IOptionalProgress, IPropertyWord, IWords } from '../types/types';

const PageСollectorTextbook = () => {

  const [words, setWords] = useState<IWords[]>([]);
  const [fullWords, setFullWords] = useState<IFullWordsForBook[]>([]);
  // const [difficultWords, setDifficultWords] = useState<IWords[]>([]);
  // const [learnedWords, setLearnedWords] = useState<IWords[]>([]);
  const [group, setGroup] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [cologBgCard, setCologBgCard] = useState('#4640BE')
  const [fetchWords, isWordsLoad, wordsError] = useFetch(getWordsForMain)

  const { isAuth } = useContext(MyContext)
  // localStorage.setItem('ps0m_group', JSON.stringify(group));
  // localStorage.setItem('ps0m_page', JSON.stringify(page));
  // localStorage.setItem('ps0m_color', JSON.stringify(cologBgCard));

  async function getWordsForMain() {
    const wordMain: IWords[] = await getWords(group, page);

    setWords(wordMain)

    if (!isAuth) {
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

    console.log(wordsWithProgress, progressForWords);


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
    fetchWords()
  }, [group, page])

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