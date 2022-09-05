import { FC } from "react";
import classes from "./Button.module.scss";

interface ButtonProps {
  className?: string
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
  children?: React.ReactNode
  disabled?: boolean
  style?: React.CSSProperties | undefined
  title?: string
}

const Button: FC<ButtonProps> = ({ className, onClick, children, disabled, style, title }) => {

  const cardClasses = [classes.button, className];

  return (
    <button
      title={title}
      style={style}
      onClick={onClick}
      disabled={disabled}
      className={cardClasses.join(" ")} >
      {children}
    </button>
  );
};

export default Button;