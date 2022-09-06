/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, MutableRefObject, SetStateAction, useContext, useEffect } from 'react';
import { MyContext } from '../../../context/context';
import styles from './Dropdown.module.scss';
import DropdownItem from './DropdownItem';


type Props = {
  valueItem: { textName: string; color?: string; value: number; }[],
  className: string,
  setActive: Dispatch<SetStateAction<boolean>>,
  icon?: JSX.Element | undefined
  clickHandler: (number: number, color?: string) => () => void;
  refContainer: MutableRefObject<HTMLDivElement | null>;
}

const DropdownList = ({ valueItem, className, setActive, icon, clickHandler, refContainer }: Props) => {

  const { isAuth } = useContext(MyContext)


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
      <ul className={`${styles.sectionWr__button__list} ${className}`}
      >
        {valueItem.map((item, index) => {
          if (!isAuth && index > 5) {
            return
          }

          return <DropdownItem
            icon={icon}
            textName={item.textName}
            color={item.color}
            value={item.value}
            key={index}
            clickHandler={clickHandler(item.value - 1, item.color)}
          />
        })
        }
      </ul>
    </>

  )
}

export default DropdownList;
