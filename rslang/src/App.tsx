import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MyContext } from './context/context';
import { InitialisAuth } from './helpers/helpers';
import AudioCallGame from './pages/AudioCallGame';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';
import SprintGame from './pages/SprintGame';
import TextbookPage from './pages/TextbookPage';
import './styles/App.scss';
import { IAuth } from './types/types';

function App() {
  const [isAuth, setIsAuth] = useState<IAuth | null>(() => {
    return InitialisAuth()
  })

  return (
    <MyContext.Provider value={{
      isAuth,
      setIsAuth
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<MainPage />} />
          <Route path="/book" element={<TextbookPage />} />
          <Route path="/sprint_game" element={<SprintGame />} />
          <Route path="/audio_call_game" element={<AudioCallGame />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="*"
            element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;