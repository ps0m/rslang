import { useState } from 'react';
import Auth from '../components/UI/Auth/Auth';
import Header from '../components/UI/Header/Header';
import PopUpMenu from '../components/UI/PopUpMenu/PopUpMenu';

const AuthPage = () => {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <div>
      {menuActive && <PopUpMenu setActive={setMenuActive} />}
      <Header />
      <Auth />
    </div>
  )
}

export default AuthPage