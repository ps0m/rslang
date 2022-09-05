import React from 'react'
import styles from './Dropdown.module.scss'

type Props = {
  textName: string;
  color?: string;
  value?: number;
  icon?: JSX.Element | undefined;
  clickHandler: () => void
};

const DropdownItem = ({ textName, color, icon, clickHandler }: Props) => {
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

