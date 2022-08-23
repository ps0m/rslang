import { FC } from "react";
import classes from "./Button.module.css";

interface ButtonProps {
  className?: string
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
  children?: React.ReactNode
  disabled?: boolean
}

const Button: FC<ButtonProps> = ({ className, onClick, children, disabled }) => {

  const cardClasses = [classes.button, className];

  return (
    <button onClick={onClick} disabled={disabled} className={cardClasses.join(" ")} >
      {children}
    </button>
  );
};

export default Button;