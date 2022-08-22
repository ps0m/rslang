import { FC } from "react";
import classes from "./Button.module.css";

interface MyButtonProps {
  className?: string
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
  children?: React.ReactNode
  disabled?: boolean
}

const MyButton: FC<MyButtonProps> = ({ className, onClick, children, disabled }) => {

  const cardClasses = [classes.button, className];

  return (
    <button onClick={onClick} disabled={disabled} className={cardClasses.join(" ")} >
      {children}
    </button>
  );
};

export default MyButton;