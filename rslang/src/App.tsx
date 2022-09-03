import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import FormLogin from '../src/components/UI/Auth/FormLogin';
import FormRegister from '../src/components/UI/Auth/FormRegister';
import { MyContext } from './context/context';
import AudioCallGame from './pages/AudioCallGame';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';
import SprintGame from './pages/SprintGame';
import StatisticPage from './pages/StatisticPage';
import TextbookPage from './pages/TextbookPage';
import './styles/App.scss';

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(true)

  return (
    <MyContext.Provider value={{
      isAuth
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<MainPage />} />
          <Route path="/book" element={<TextbookPage />} />
          <Route path="/sprint_game" element={<SprintGame />} />
          <Route path="/audio_call_game" element={<AudioCallGame />} />
          <Route path="/statistic" element={<StatisticPage />} />
          statistic
          <Route
            path="*"
            element={<Navigate to="/home" replace />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/login" element={<FormLogin />} />
          <Route path="/register" element={<FormRegister />} />
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;