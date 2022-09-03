import { useState } from "react";
import Header from "../components/UI/Header/Header";
import PopUpMenu from "../components/UI/PopUpMenu/PopUpMenu";
import Statistic from "../components/UI/Statistic/Statistic";

const StatisticPage = () => {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <>
      {menuActive && <PopUpMenu setActive={setMenuActive} />}
      <Header setActive={setMenuActive} />
      <Statistic></Statistic>
    </>
  );
};

export default StatisticPage;