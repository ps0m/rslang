import styles from './ItemPopUpMenu.module.scss'

interface IItemProps {
  itemText: string,
  itemImg: string,
  itemLink: string,
}

const ItemPopUpMenu = ({ itemText, itemImg, itemLink }: IItemProps) => {

  return (
    <div className={styles.item}>
      <img className={styles.item__img} src={require(`../../../assets/icon/${itemImg}.png`)} alt='itemMenu' />
      <a className={styles.item__disc} href={itemLink}>{itemText}</a>
    </div>
  )
}

export default ItemPopUpMenu

