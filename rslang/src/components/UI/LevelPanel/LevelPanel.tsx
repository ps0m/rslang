import { Dispatch, FC, SetStateAction, useState } from "react";
import Button from "../Button/Button";
import { contentForLevelPanel } from "./contentForLevelPanel";
import styles from "./LevelPanel.module.scss";

interface IPropsLevelPanel {
  setGroup: Dispatch<SetStateAction<number | null>>
}

const LevelPanel: FC<IPropsLevelPanel> = ({ setGroup }) => {
  const [level, setLevel] = useState<number | null>(null)

  return (
    <div className={styles.panel}>
      <p className={styles.panel__title}>Выберите уровень сложности:</p>
      <p className={styles.panel__text} >
        {
          level
            ? contentForLevelPanel[level].text
            : 'Выбирайте уровень ниже, здесь мы немного расскажем о каждом из них'
        }
      </p>
      <div className={styles.panel__radios}>
        {
          contentForLevelPanel.map((item, index) => {
            return (
              <div className={styles.panel__radio} key={index}>
                <input
                  type="radio"
                  value={index}
                  id={`rounded${index}`}
                  name="check"
                  onChange={(e) => setLevel(Number(e.target.value))}
                />
                <label
                  htmlFor={`rounded${index}`}
                  className={styles.panel__radio_point}>
                </label>
                <label
                  className={styles.panel__radio_label}>
                  {item.title}
                </label>
              </div>
            )
          })
        }
      </div>

      <Button
        disabled={level === undefined}
        className={styles.panel__button}
        onClick={() => {

          if (level !== null) {
            setGroup(level)
          }
        }}>
        К игре
      </Button>
    </div >
  );
};

export default LevelPanel;
