import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react'
import styles from './Dropdown.module.scss'
import DropdownItem from './DropdownItem'


type Props = { 
  valueItem: { textName: string;  color?: string; value: number; }[],
  className: string,
  setActive: Dispatch<SetStateAction<boolean>>,
  icon?: JSX.Element | undefined
  clickHandler: (number: number) => () => void;
  refContainer: MutableRefObject<HTMLDivElement | null>;
  }

const DropdownList = ({ valueItem, className, setActive, icon, clickHandler, refContainer }: Props) => {

  useEffect(() => {
    const callback = (event: MouseEvent | TouchEvent) => {
      if (!refContainer.current || (event.target instanceof Node && refContainer.current.contains(event.target))) {
        return;
      }

      setActive(false);
    };

    document.addEventListener('mousedown', callback)
    document.addEventListener('touchstart', callback)

    return () => {
      document.removeEventListener('mousedown', callback)
      document.removeEventListener('touchstart', callback)
    }
  }, [])

  return (
    <>
      <ul  className={`${styles.sectionWr__button__list} ${className}`}
      >
        {valueItem.map((item, index) => {
          return <DropdownItem
            icon={icon} 
            textName={item.textName}
            color={item.color}
            value={item.value}            
            key={index}
            clickHandler={clickHandler(item.value - 1)}
            />
        })
        }
      </ul>
</>

  ) 
}

export default DropdownList;
