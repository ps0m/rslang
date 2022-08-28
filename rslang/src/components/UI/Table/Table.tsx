import { FC } from "react";
import { URL_BASE } from "../../../constants/constatnts";
import { ICustomStat } from "../../../types/types";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import { ReactComponent as YesLogo } from "./assets/check_circle.svg";
import { ReactComponent as NoLogo } from "./assets/x_circle.svg";
import styles from "./Table.module.scss";

interface ITableProps {
  stat: ICustomStat[] | null
}

const Table: FC<ITableProps> = ({ stat }) => {
  const mistakes = stat?.filter(item => !item.isRight).length;
  const rightAnswer = stat?.filter(item => item.isRight).length;

  return (
    <div className={styles.table__container} >
      <div className={styles.table__header}> <span>Верных слов: {rightAnswer},</span> слов с ошибками:  {mistakes}</div>
      <table className={styles.table}>
        <th >№</th>
        <th >Answer</th>
        <th >Word</th>
        <th >Translate</th>
        <th >Listen</th>

        <tbody >
          {stat?.map((item, index) => {
            return (
              <tr key={item.word.id}>
                <td >{index + 1}</td>
                <td >{
                  item.isRight
                    ? <YesLogo className={styles.logo_yes} />
                    : <NoLogo className={styles.logo_no} />
                }
                </td>
                <td >{item.word.word}</td>
                <td >{item.word.wordTranslate}</td>
                <td ><AudioPlayer
                  path={`${URL_BASE}/${item.word.audio}`}
                  className={styles.audioPlayer}
                /></td>
              </tr>
            )
          })}
        </tbody>

      </table >
    </div >

  );
};

export default Table;