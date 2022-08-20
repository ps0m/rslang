import styles from './Button.module.scss'
import {IButtonProps} from '../interface'
import {definingСlassBtn} from '../helpFn/HelpFn'

const Button = (props:IButtonProps) => {  
  const {classBtn, textBtn} = props  
  const propsClass = definingСlassBtn(classBtn, styles)
  return (
    <div className={`${styles.button} ${propsClass}`}>{textBtn}</div>
  )
}

export default Button
