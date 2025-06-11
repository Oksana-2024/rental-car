interface IButton {
  text: string;
  type: "submit" | "button";
  className: string;
  onClick?: () => void;
}
const Button = ({ text, type, className, onClick }: IButton) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
