import styles from './PopUpMenu.module.scss'
import {itemOne, itemTwo, itemThree, itemFour, itemFive, itemSix} from './textPopUpMenu'
import ItemPopUpMenu from '../itemPopUpMenu/ItemPopUpMenu'
import {Dispatch, SetStateAction} from 'react'

type Props = { setActive: Dispatch<SetStateAction<boolean>> }

const PopUpMenu = ({ setActive }: Props) => {  

  return (
    <div className={styles.blackout} onClick={() => setActive(false)}>
      <div className={styles.container}>
        <div className={styles.popUpMenu} onClick={(e) => e.stopPropagation()}>
        <ItemPopUpMenu {...itemOne}/>
        <ItemPopUpMenu {...itemTwo}/>
        <ItemPopUpMenu {...itemThree}/>
        <ItemPopUpMenu {...itemFour}/>
        <ItemPopUpMenu {...itemFive}/>
        <ItemPopUpMenu {...itemSix}/>
        </div>
      </div>
    </div>
  )
}

export default PopUpMenu
