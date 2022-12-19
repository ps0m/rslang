import { Dispatch, SetStateAction, useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as IconFolder } from '../../../assets/icon/folder.svg'
import { ReactComponent as IconGame } from '../../../assets/icon/gameBook.svg'
import { ReactComponent as IconNextPage } from '../../../assets/icon/nextArrow.svg'
import { ReactComponent as IconPage } from '../../../assets/icon/page.svg'
import { ReactComponent as IconPrevPage } from '../../../assets/icon/previousArrow.svg'
import { MyContext } from '../../../context/context'
import Button from '../Button/Button'
import DropdownList from '../Dropdown/DropdownList'
import { headerTextbook, page, section } from './contentMenuTextbook'
import styles from './MenuTextbook.module.scss'

type Props = {
  setGroup: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<number>>;
  setCologBgCard: Dispatch<SetStateAction<string>>;
  numberPage: number;
  numberGroup: number;
  isAddStyle: boolean
}

const MenuTextbook = ({ setPage, setGroup, setCologBgCard, numberPage, numberGroup, isAddStyle }: Props) => {
  const [sectionActive, setSectionActive] = useState(false);
  const [pageActive, setPageActive] = useState(false);
  const [colorActive, setColorActive] = useState('#4640BE');

  const { isAuth } = useContext(MyContext)

  const navigate = useNavigate();

  const clickSectionItem = (number: number, color?: string) => () => {
    setSectionActive(false);
    setGroup(number);
    if (color !== undefined) {
      setCologBgCard(color)
      setColorActive(color)
    }

  }

  const clickPageActive = (number: number, color?: string) => () => {
    setPageActive(false);
    setPage(number);
    if (color !== undefined) {
      setCologBgCard(color)
      setColorActive(color)
    }
  }

  const folderСolor = {
    backgroundColor: colorActive
  }

  const refSectionActive = useRef<HTMLDivElement | null>(null);
  const refPageActive = useRef<HTMLDivElement | null>(null);

  const goSprintGame = () => navigate('/sprint_game', { state: { group: numberGroup, page: numberPage, from: 'book' } });
  const goAudioGame = () => navigate('/audio_call_game', { state: { group: numberGroup, page: numberPage, from: 'book' } });

  return (
    <>
      <section className={`${styles.menuTextbook} ${styles.container}`}>
        <div className={[styles.menuTextbook__wrNav,
        isAddStyle ? styles.menuTextbook__wrNav_active : ''].join(' ')}>
          <h1 className={styles.menuTextbook__wrNav__header}>{headerTextbook}</h1>
          <div className={styles.menuTextbook__wrNav__nav}>
            {/* блок с переключением разделов */}
            <div className={styles.sectionWr__navAndPage}>
              <div ref={refSectionActive} className={styles.sectionWr}>
                <Button
                  style={folderСolor}
                  className={styles.sectionWr__button}
                  onClick={() => {
                    setSectionActive((prevState) => !prevState)
                  }}
                >
                  <IconFolder className={styles.sectionWr__button_img} />
                  <div className={styles.sectionWr__button_desc}>{`Раздел ${numberGroup + 1}`}</div>
                </Button>

                {sectionActive && <DropdownList
                  valueItem={isAuth ? section : section.slice(0, -1)}
                  className={styles.sectionDimensions}
                  setActive={setSectionActive}
                  icon={<IconFolder className={styles.iconSection} />}
                  clickHandler={clickSectionItem}
                  refContainer={refSectionActive}
                />}

              </div>

              {/* блок с переключением страниц */}
              <div className={`${styles.sectionWr__page}`}>
                {/* предыдущая */}
                <Button
                  className={`${styles.sectionWr__button} ${styles.button__previousPage}`}
                  onClick={() => {
                    setPage((prevState) => {
                      if (prevState > 0) {
                        return prevState - 1
                      }

                      return prevState
                    })
                  }}
                >
                  <IconPrevPage className={styles.sectionWr__button_img} />
                </Button>
                {/* список страниц */}
                <div ref={refPageActive} className={styles.sectionWr}>
                  <Button
                    className={styles.sectionWr__button}
                    onClick={() => setPageActive((prevState) => !prevState)}
                  >
                    <IconPage className={styles.sectionWr__button_img} />
                    <div className={styles.sectionWr__button_desc}>{`Страница ${numberPage + 1}`}</div>
                  </Button>
                  {pageActive && <DropdownList
                    valueItem={page}
                    className={[styles.sectionPage, styles.ulScroll].join(' ')}
                    setActive={setPageActive}
                    clickHandler={clickPageActive}
                    refContainer={refPageActive}
                  />}
                </div>
                {/* следующая */}
                <Button
                  className={`${styles.sectionWr__button} ${styles.button__nextPage}`}
                  onClick={() => {
                    setPage((prevState) => {
                      if (prevState < 29) {
                        return prevState + 1
                      }

                      return prevState
                    })
                  }}
                >
                  <IconNextPage className={styles.sectionWr__button_img} />
                </Button>
              </div>
            </div>
            {/* блок с играми */}
            <div className={styles.sectionWr__game}>
              <Button
                disabled={isAddStyle}
                className={`${styles.sectionWr__button} ${styles.button__game}`}
                onClick={() => goAudioGame()}
              >
                <IconGame className={styles.sectionWr__button_img} />
                <div className={styles.sectionWr__button_desc}>Аудиовызов</div>
              </Button>
              <Button
                disabled={isAddStyle}
                className={`${styles.sectionWr__button} ${styles.button__game}`}
                onClick={() => goSprintGame()}
              >
                <IconGame className={styles.sectionWr__button_img} />
                <div className={styles.sectionWr__button_desc}>Спринт</div>
              </Button>
            </div>
          </div>
        </div>

      </section>
    </>
  )
}

export default MenuTextbook
