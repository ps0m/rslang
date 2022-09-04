import Footer from '../components/UI/Footer/Footer';
import Header from '../components/UI/Header/Header';
import MenuTextbook from '../components/UI/MenuTextbook/MenuTextbook';
import MainTexbook from '../components/UI/MainTexbook/MainTexbook';

import { useEffect, useState } from 'react'
import { IWords } from '../types/types'
import { getWords } from '../components/API/API'

const PageСollectorTextbook = ()  => {

  const [wordCards, setWordCards] = useState<Array<IWords>>([]);
  const [group, setGroup] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [cologBgCard, setCologBgCard] = useState('#4640BE')

  const getWordsForMain = async (group: number, page:number ) => {
    try {
      const wordMain: Array<IWords> =  await getWords(group, page);

      setWordCards(wordMain)
    } catch {
      console.warn('Запрос упал getWords')
    }
  }

  useEffect(() => {
    getWordsForMain(group, page);
  }, [group, page])

  return (
    <>
      <Header />
      <MenuTextbook 
      setGroup={setGroup} 
      setPage={setPage}
      setCologBgCard={setCologBgCard}
      numberPage={page}
      numberGroup={group}/>
      <MainTexbook wordCards={wordCards} style={cologBgCard} />
      <Footer />
    </>
  );
}

export default PageСollectorTextbook;