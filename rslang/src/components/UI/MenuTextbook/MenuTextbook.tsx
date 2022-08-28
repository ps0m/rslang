import styles from './MenuTextbook.module.scss'
import {headerTextbook, section, page} from './contentMenuTextbook'
import DropdownList from '../Dropdown/DropdownList'
import Button from '../Button/Button'
import { ReactComponent as IconFolder} from '../../../assets/icon/folder.svg'
import { ReactComponent as IconPage} from '../../../assets/icon/page.svg'
import { ReactComponent as IconGame} from '../../../assets/icon/gameBook.svg'
import { ReactComponent as IconNextPage} from '../../../assets/icon/nextArrow.svg' 
import { ReactComponent as IconPrevPage} from '../../../assets/icon/previousArrow.svg' 

import { useState } from 'react';

const MenuTextbook = () => {
  const [sectionActive, setSectionActive] = useState(false);
  const [pageActive, setPageActive] = useState(false);

  return (
    <>
      <section className={`${styles.menuTextbook} ${styles.container}`}>
        <div className={styles.menuTextbook__wrNav}>
          <h1 className={styles.menuTextbook__wrNav__header}>{headerTextbook}</h1>
          <div className={styles.menuTextbook__wrNav__nav}>
            {/* блок с переключением разделов */}            
            <div className={styles.sectionWr}>
              <Button
              className={styles.sectionWr__button}
              onClick={() => setSectionActive((prevState) => !prevState)}
              >
                <IconFolder className={styles.sectionWr__button_img} />
                <div className={styles.sectionWr__button_desc}>Раздел1</div>
              </Button>

              {sectionActive && <DropdownList 
              valueItem={section} 
              className={styles.sectionDimensions} 
              setActive={setSectionActive} 
              icon={<IconFolder className={styles.iconSection} />}
              />}

            </div>

            {/* блок с переключением страниц */}
            <div className={`${styles.sectionWr__page}`}>
            {/* предыдущая */}
            <Button
            className={`${styles.sectionWr__button} ${styles.button__previousPage}`}
            onClick={() => ('#')}
            >                
              <IconPrevPage className={styles.sectionWr__button_img} />
            </Button>
            {/* список страниц */}
            <div className={styles.sectionWr}>
            <Button
            className={styles.sectionWr__button}
            onClick={() => setPageActive((prevState) => !prevState)}
            >
              <IconPage className={styles.sectionWr__button_img} />
              <div className={styles.sectionWr__button_desc}>Страница1</div>
            </Button>
            {pageActive && <DropdownList 
            valueItem={page} 
            className={`${styles.sectionPage} ${styles.ulScroll}`} 
            setActive= {setPageActive}/>}
            </div>
            {/* следующая */}
            <Button
              className={`${styles.sectionWr__button} ${styles.button__nextPage}`}
              onClick={() => ('#')}
              >                
                <IconNextPage className={styles.sectionWr__button_img} />
            </Button>
            </div>            

            {/* блок с играми */}
            <Button
              className={`${styles.sectionWr__button} ${styles.button__game}`}
              onClick={() => ('#')}
              >                
              <IconGame className={styles.sectionWr__button_img} />
              <div className={styles.sectionWr__button_desc}>ПерваяИгра</div>
            </Button>
            <Button
              className={`${styles.sectionWr__button} ${styles.button__game}`}
              onClick={() => ('#')}
              >                
              <IconGame className={styles.sectionWr__button_img} />
              <div className={styles.sectionWr__button_desc}>ВтораяИгра</div>
            </Button>

          </div>
        </div>
        
      </section>
    </>
  )
}

export default MenuTextbook
