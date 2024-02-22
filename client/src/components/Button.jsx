const defaultButtonStyle =
  "px-4 py-2 bg-blue-200 rounded hover:bg-blue-300 transition";

const Button = ({ children }) => {
  return <button className={defaultButtonStyle}>{children}</button>;
};

export default Button;
