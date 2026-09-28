import './Button.scss'
type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};
const Button = ({ children, type = "button", onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} type={type} className="primary">
      {children}
    </button>
  );
};
export default Button;
