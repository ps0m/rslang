import { useState } from 'react';
import { MyContext } from './context/context';
import MainPage from './pages/MainPage';
import './styles/App.css';

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(true)

  return (
    <MyContext.Provider value={{
      isAuth
    }}>
      <div className="App">
        <MainPage />
      </div>
    </MyContext.Provider>
  );
}

export default App;