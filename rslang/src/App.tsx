import { useState } from 'react';
import './App.css';
import { MyContext } from './context/context';

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(true)

  return (
    <MyContext.Provider value={{
      isAuth
    }}>
      <div className="App">
      </div>
    </MyContext.Provider>
  );
}

export default App;