import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import styles from './ItemPopUpMenu.module.scss';

interface IItemProps {
  itemText: string,
  itemImg: string,
  itemLink: string,
}

const ItemPopUpMenu = ({ itemText, itemImg, itemLink }: IItemProps) => {

  const navigate = useNavigate();

  return (
    <>
      <Button
        className={styles.item}
        onClick={() => navigate(itemLink,
          itemLink === '/sprint_game' || itemLink === '/audio_call_game'
            ? { state: { group: null, page: null, from: 'menu' } } : {})}
      >
        <img className={styles.item__img} src={require(`../../../assets/icon/${itemImg}.png`)} alt='itemMenu' />
        <div className={styles.item__disc}>{itemText}</div>
      </Button >
    </ >
  )
}

export default ItemPopUpMenu
