import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MyContext } from './context/context';
import TextbookPage from './pages/TextbookPage';
import MainPage from './pages/MainPage';
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
          <Route
            path="*"
            element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;