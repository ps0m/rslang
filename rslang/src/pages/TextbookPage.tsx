import Footer from '../components/UI/Footer/Footer';
import Header from '../components/UI/Header/Header';
import PopUpMenu from '../components/UI/PopUpMenu/PopUpMenu';
import MenuTextbook from '../components/UI/MenuTextbook/MenuTextbook';
import MainTexbook from '../components/UI/MainTexbook/MainTexbook';


import { useEffect, useState } from 'react'
import { IWords } from '../types/types'
import { getWords } from '../components/API/API'

const PageСollectorTextbook = ()  => {
  const [menuActive, setMenuActive] = useState(false);

  const [wordCards, setWordCards] = useState<Array<IWords>>([]);
  const [group, setGroup] = useState<number>(0);
  const [page, setPage] = useState<number>(0);

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
      {menuActive && <PopUpMenu setActive={setMenuActive} />}
      <Header setActive={setMenuActive} />
      <MenuTextbook 
      setGroup={setGroup} 
      setPage={setPage} 
      numberPage={page}
      numberGroup={group}/>
      <MainTexbook wordCards={wordCards} />
      <Footer />
    </>
  );
}

export default PageСollectorTextbook;