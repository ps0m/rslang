import { FC } from 'react';
import Button from '../Button/Button';
import { ReactComponent as VolumeOff } from "./assets/volume_off.svg";
import { ReactComponent as VolumeOn } from "./assets/volume_on.svg";
import styles from './VolumeChange.module.scss';


interface IPropsVolumeChange {
  active: boolean
  action: () => void
  className?: string
}

const VolumeChange: FC<IPropsVolumeChange> = ({ active, action, className }) => {
  return (
    <Button
      className={[styles.volume, className ? className : ''].join(' ')}
      onClick={() => action()}>
      {active
        ? <VolumeOn />
        : <VolumeOff />
      }
    </Button>
  );
};

export default VolumeChange;