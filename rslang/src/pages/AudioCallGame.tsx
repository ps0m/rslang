import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWords } from "../components/API/API";
import Button from "../components/UI/Button/Button";
import CardOfAudio from "../components/UI/CardOfAudio/CardOfAudio";
import LevelPanel from "../components/UI/LevelPanel/LevelPanel";
import { ReactComponent as NoLogo } from "../components/UI/Table/assets/x_circle.svg";
import Table from "../components/UI/Table/Table";
import { AMOUNT_VARIANTS_OF_AUDIO_GAMES, PAGES_PER_GROUP } from "../constants/constatnts";
import { shuffleArray } from "../helpers/helpers";
import { IContentForAudio, ICustomStat, IWords } from "../types/types";


const AudioCallGame = () => {
  const [group, setGroup] = useState<number | undefined>();
  const [words, setWords] = useState<IWords[]>([]);
  const [contentForCard, setContentForCard] = useState<IContentForAudio | null>(null);
  const [statistic, setStatistic] = useState<ICustomStat[] | null>(null);
  const [isFinishGame, setIsFinishGame] = useState<boolean>(false);

  const getWordsForGame = async (group: number | undefined) => {
    const arrayPromisesWord = [];

    for (let i = 0; i < PAGES_PER_GROUP; i++) {
      arrayPromisesWord.push(getWords(group, i))
    }

    const allWordsOfgroup = await Promise.all(arrayPromisesWord)

    setWords(allWordsOfgroup.flat())
  }

  useEffect(() => {
    if (group !== undefined) {
      getWordsForGame(group);
    }
  }, [group])

  const getOrderRandomWords = (words: IWords[]) => {
    if (words.length === 0) {
      return
    }

    const randomIndexWordStudy = Math.floor(Math.random() * words.length)
    const randomWordStudy = words[randomIndexWordStudy]
    const randomExtraWords: IWords[] = []

    randomExtraWords.push(randomWordStudy);

    for (let i = 1; i < AMOUNT_VARIANTS_OF_AUDIO_GAMES; i++) {
      let randomIndexExtraWords

      do {
        randomIndexExtraWords = Math.floor(Math.random() * words.length)

      } while (randomExtraWords.includes(words[randomIndexExtraWords]));

      randomExtraWords.push(words[randomIndexExtraWords])
    }

    console.log(randomWordStudy, randomExtraWords);

    setContentForCard({
      wordStudy: randomWordStudy,
      extraWords: shuffleArray(randomExtraWords),
      currentIndex: randomIndexWordStudy
    });
  }

  const updateStatistic = (newItem: ICustomStat) => {
    statistic === null
      ? setStatistic([newItem])
      : setStatistic([...statistic, newItem])
  }

  const getResultOneStepGame = (newItem: ICustomStat) => {
    updateStatistic(newItem);
  }

  useEffect(() => {
    if (statistic !== null
      && contentForCard !== null
      && words !== null) {
      setWords([...words.slice(0, contentForCard?.currentIndex), ...words.slice(contentForCard?.currentIndex + 1)])
    }
  }, [statistic])


  useEffect(() => {
    if (words !== undefined) {
      getOrderRandomWords(words);
    }
  }, [words])

  return (
    <section className="game">
      {
        isFinishGame
          ? <Table stat={statistic} />
          : (group !== undefined
            ? <CardOfAudio
              content={contentForCard}
              setIsFinishGame={setIsFinishGame}
              getResult={getResultOneStepGame} />
            : <LevelPanel
              setGroup={setGroup}
            />)
      }
      <Button
        className='game__cress'
        onClick={() => ''}>
        <Link to='/home'><NoLogo /></Link >
      </Button>
    </section>
  );
};

export default AudioCallGame;