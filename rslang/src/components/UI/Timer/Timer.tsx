/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from "react";
import Button from "../Button/Button";
import styles from "./Timer.module.scss";

interface ITimerProps {
  setIsFinishGame: (isFinish: boolean) => void
}

const Timer: FC<ITimerProps> = ({ setIsFinishGame }) => {
  const [time, setTime] = useState<number>(59);

  useEffect(() => {
    time > 0 && setTimeout(() => setTime(time - 1), 1000);
    if (time === 0) {
      setIsFinishGame(true)
    }
  }, [time]);

  return (
    <Button
      className={styles.timer}
      onClick={() => ''}>
      <p className={styles.timer__text}>{time}</p>
    </Button>
  );
};

export default Timer;