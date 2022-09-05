import { Dispatch, SetStateAction, useContext } from 'react'
import { MyContext } from '../../../context/context'
import ItemPopUpMenu from '../ItemPopUpMenu/ItemPopUpMenu'
import { contentForPopUp } from './contentForPopUpMenu'
import styles from './PopUpMenu.module.scss'

type Props = { setActive: Dispatch<SetStateAction<boolean>>; }

const PopUpMenu = ({ setActive }: Props,) => {

  const { isAuth } = useContext(MyContext)

  return (
    <div className={`${styles.popUpMenu}`} onClick={() => setActive(false)}>
      <div className={styles.menu}>
        {contentForPopUp.map((item, index) => {
          if (!isAuth && item.itemLink === '/statistic') {
            return
          }

          return <ItemPopUpMenu
            itemText={item.itemText}
            itemImg={item.itemImg}
            itemLink={item.itemLink}
            key={index}
          />
        })
        }
      </div>
      <div className={styles.blackout}></div>
    </div>
  )
}

export default PopUpMenu
