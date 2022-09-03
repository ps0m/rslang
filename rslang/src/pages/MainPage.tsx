import FeaturesSection from '../components/UI/FeaturesSection/FeaturesSection';
import Footer from '../components/UI/Footer/Footer';
import Header from '../components/UI/Header/Header';
import MainSection from '../components/UI/MainSection/MainSection';
import PopUpMenu from '../components/UI/PopUpMenu/PopUpMenu';
import MainTeam from '../components/UI/MainTeam/MainTeam';

import { useState } from 'react';

const PageСollector = () => {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <>
      {menuActive && <PopUpMenu setActive={setMenuActive} />}
      <Header setActive={setMenuActive} />
      <MainSection />
      <MainTeam />
      <FeaturesSection />
      <Footer />
    </>
  );
}

export default PageСollector;