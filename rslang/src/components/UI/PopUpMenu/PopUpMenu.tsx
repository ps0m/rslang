import { Dispatch, SetStateAction } from 'react'
import ItemPopUpMenu from '../ItemPopUpMenu/ItemPopUpMenu'
import { contentForPopUp } from './contentForPopUpMenu'
import styles from './PopUpMenu.module.scss'

type Props = { setActive: Dispatch<SetStateAction<boolean>> }

const PopUpMenu = ({ setActive }: Props) => {

  return (
    <div className={styles.blackout} onClick={() => setActive(false)}>
      <div className={styles.container}>
        <div className={styles.popUpMenu} onClick={(e) => e.stopPropagation()}>
          {contentForPopUp.map((item, index) => {
            return <ItemPopUpMenu
              itemText={item.itemText}
              itemImg={item.itemImg}
              itemLink={item.itemLink}
              key={index}
            />
          })
          }
        </div>
      </div>
    </div>
  )
}

export default PopUpMenu
