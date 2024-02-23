const Button = ({ children, variant, onClick = null, disabled }) => {
  let buttonStyle;
  if (variant === "ghost") buttonStyle = "transition hover:opacity-70";
  if (variant === "primary")
    buttonStyle = "px-4 py-2 bg-blue-200 rounded hover:bg-blue-300 transition";
  return (
    <button className={buttonStyle} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
