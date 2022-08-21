import Header from '../header/Header';
import MainSection from '../mainSection/MainSection';
import FeaturesSection from '../featuresSection/FeaturesSection';
import Footer from '../footer/Footer';
import PopUpMenu from '../popUpMenu/PopUpMenu';

import { useState } from 'react'

function PageСollector() {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <>
      {menuActive && <PopUpMenu setActive={setMenuActive}/>}
      <Header setActive={setMenuActive}/>
      <MainSection />            
      <FeaturesSection />     
      <Footer />
    </>
  );
}

export default PageСollector;