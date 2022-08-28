import styles from './Dropdown.module.scss'
import React from 'react'

type Props = { 
  textName: string; 
  color?: string; 
  value?: number; 
  icon?: JSX.Element | undefined;
  clickHandler: () => void
};


function DropdownItem({textName, color, icon, clickHandler}:Props) {
  const fill = {
    fill: color
  }

  return (    
    <li style={fill} className={`${styles.sectionWr__button__list_item}`} onClick={clickHandler}>
      {icon}      
      {textName}
    </li>
  )
}

export default DropdownItem;

