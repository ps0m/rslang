import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MyContext } from './context/context';
import AudioCallGame from './pages/AudioCallGame';
import MainPage from './pages/MainPage';
import SprintGame from './pages/SprintGame';

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
          <Route path="/sprint_game" element={<SprintGame />} />
          <Route path="/audio_call_game" element={<AudioCallGame />} />
          <Route
            path="*"
            element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;