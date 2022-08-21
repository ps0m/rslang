import styles from './Button.module.scss'
import {definingСlassBtn} from '../../helpFn/HelpFn'

interface IButtonProps {
  classBtn: string,
  textBtn: string,
}

const Button = ({classBtn, textBtn}:IButtonProps) => {
  const propsClass = definingСlassBtn(classBtn, styles)

  return (
    <div className={`${styles.button} ${propsClass}`}>{textBtn}</div>
  )
}

export default Button
