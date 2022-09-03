import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWords } from "../components/API/API";
import Button from "../components/UI/Button/Button";
import CardOfSprint from "../components/UI/CardOfSprint/CardOfSprint";
import LevelPanel from "../components/UI/LevelPanel/LevelPanel";
import { ReactComponent as NoLogo } from "../components/UI/Table/assets/x_circle.svg";
import Table from "../components/UI/Table/Table";
import { PAGES_PER_GROUP } from "../constants/constatnts";
import { getCoefficient } from "../helpers/helpers";
import { IContentForCard, ICustomStat, IScore, IWords } from "../types/types";


const SprintGame = () => {
  const [group, setGroup] = useState<number | undefined>();
  const [words, setWords] = useState<IWords[]>([]);
  const [contentForCard, setContentForCard] = useState<IContentForCard | null>(null);
  const [score, setScore] = useState<IScore>({ amount: 0, rightAnswer: 0, coefficient: 1 });
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

  const getRandomWord = (words: IWords[]) => {
    if (words.length === 0) {
      return
    }
    const randomIndex = Math.floor(Math.random() * words.length)
    const isWillBeEqual = !!Math.floor(Math.random() * 2)
    let randomIndexForTranslate: number;

    if (!isWillBeEqual) {
      do {
        randomIndexForTranslate = Math.floor(Math.random() * words.length)

      } while (randomIndexForTranslate === randomIndex);
    } else randomIndexForTranslate = randomIndex;


    setContentForCard({
      word: words[randomIndex],
      translate: words[randomIndexForTranslate].wordTranslate,
      isEqual: isWillBeEqual,
      currentIndex: randomIndex
    });
  }

  const updateScore = (newItem: ICustomStat) => {
    newItem.isRight
      ? setScore({
        amount: (score.amount + 10 * score.coefficient),
        rightAnswer: (score.rightAnswer + 1),
        coefficient: getCoefficient(score.rightAnswer + 1)
      })
      : setScore({
        amount: score.amount,
        rightAnswer: 0,
        coefficient: 1
      })
  }


  const updateStatistic = (newItem: ICustomStat) => {
    statistic === null
      ? setStatistic([newItem])
      : setStatistic([...statistic, newItem])
  }

  const getResultOneStepGame = (newItem: ICustomStat) => {
    updateScore(newItem);
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
      getRandomWord(words);
    }
  }, [words])

  return (
    <section className="game">
      {
        isFinishGame
          ? <Table stat={statistic} />
          : (group !== undefined
            ? <CardOfSprint
              content={contentForCard}
              score={score}
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

export default SprintGame;