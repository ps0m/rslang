import { FC } from 'react';
import Button from '../Button/Button';
import { ReactComponent as VolumeOff } from "./assets/volume_off.svg";
import { ReactComponent as VolumeOn } from "./assets/volume_on.svg";
import styles from './VolumeChange.module.scss';


interface IPropsVolumeChange {
  active: boolean
  action: () => void
  className?: string
  disabled?: boolean
}

const VolumeChange: FC<IPropsVolumeChange> = ({ active, action, className, disabled }) => {
  return (
    <Button
      disabled={disabled}
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