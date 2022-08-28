import Footer from '../components/UI/Footer/Footer';
import Header from '../components/UI/Header/Header';
import PopUpMenu from '../components/UI/PopUpMenu/PopUpMenu';
import MenuTextbook from '../components/UI/MenuTextbook/MenuTextbook';
import MainTexbook from '../components/UI/MainTexbook/MainTexbook';


import { useState } from 'react';

function PageСollectorTextbook() {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <>
      {menuActive && <PopUpMenu setActive={setMenuActive} />}
      <Header setActive={setMenuActive} />
      <MenuTextbook />
      <MainTexbook />
      <Footer />
    </>
  );
}

export default PageСollectorTextbook;