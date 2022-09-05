import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MyContext } from './context/context';
import { InitialisAuth } from './helpers/helpers';
import AudioCallGame from './pages/AudioCallGame';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';
import SprintGame from './pages/SprintGame';
import StatisticPage from './pages/StatisticPage';
import TextbookPage from './pages/TextbookPage';
import './styles/App.scss';
import { IAuth } from './types/types';

const App = () => {
  const [isAuth, setIsAuth] = useState<IAuth | null>(() => {
    return InitialisAuth()
  })

  return (
    <MyContext.Provider value={{ isAuth, setIsAuth }}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainPage />} path="/home" />
          <Route element={<TextbookPage />} path="/book" />
          <Route element={<SprintGame />} path="/sprint_game" />
          <Route element={<AudioCallGame />} path="/audio_call_game" />
          <Route element={<StatisticPage />} path="/statistic" />
          <Route element={<MainPage />} path="/team" />
          <Route element={<AuthPage />} path="/auth" />
          <Route element={<Navigate to="/home" replace />} path="*" />
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;