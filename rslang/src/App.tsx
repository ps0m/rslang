import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MyContext } from './context/context';
import TextbookPage from './pages/TextbookPage';
import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';
import FormLogin from '../src/components/UI/Auth/FormLogin';
import FormRegister from '../src/components/UI/Auth/FormRegister;
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
          <Route path="/book" element={<TextbookPage />} />
          <Route path="/sprint_game" element={<SprintGame />} />

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