import "./Button.scss";
type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
};
const Button = ({
  children,
  type = "button",
  onClick,
  className = "primary",
}: ButtonProps) => {
  return (
    <button onClick={onClick} type={type} className={className}>
      {children}
    </button>
  );
};
export default Button;
