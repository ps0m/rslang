import { useState } from 'react';
import './App.css';
import Card from './components/Card/Card';
import { MyContext } from './context/context';

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(true)

  return (
    <MyContext.Provider value={{
      isAuth
    }}>
      <div className="App">
        <Card
          // example
          word={{
            "id": "5e9f5ee35eb9e72bc21af4a5",
            "group": 0,
            "page": 0,
            "word": "breakfast",
            "image": "files/01_0006.jpg",
            "audio": "files/01_0006.mp3",
            "audioMeaning": "files/01_0006_meaning.mp3",
            "audioExample": "files/01_0006_example.mp3",
            "textMeaning": "<i>Breakfast</i> is the morning meal.",
            "textExample": "I ate eggs for <b>breakfast</b>.",
            "transcription": "[brekfəst]",
            "textExampleTranslate": "Я ел яйца на завтрак",
            "textMeaningTranslate": "Завтрак - это утренняя трапеза",
            "wordTranslate": "завтрак"
          }}
          isAuth={true}
          learned={true}
          difficult={false}
        />
      </div>
    </MyContext.Provider>
  );
}

export default App;
