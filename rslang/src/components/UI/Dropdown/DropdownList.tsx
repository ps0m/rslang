import { Dispatch, SetStateAction, useEffect, useRef} from 'react'
import styles from './Dropdown.module.scss'
import DropdownItem from './DropdownItem'


type Props = { 
  valueItem: { textName: string;  color?: string; value?: number; }[], 
  className: string,
  setActive: Dispatch<SetStateAction<boolean>>,
  icon?: JSX.Element | undefined
  }

function DropdownList({valueItem, className, setActive, icon}:Props) {

  const ref = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const callback = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || (event.target instanceof Node && ref.current.contains(event.target))) {        
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
      <ul ref={ref} className={`${styles.sectionWr__button__list} ${className}`} 
      >
        {valueItem.map((item, index) => {
          return <DropdownItem
            icon={icon} 
            textName={item.textName}
            color={item.color}
            value={item.value}            
            key={index}
            clickHandler={() => {
              console.log(item.value)
            }}
            />
        })
        }
      </ul>
      {/* <input type={'text'} name={'section'} value={''} /> */}
      {/* onClick={() => {setActive((prevState) => !prevState)}} */}
</>

  ) 
}

export default DropdownList;
