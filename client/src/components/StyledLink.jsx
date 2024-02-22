import { Link } from "react-router-dom";

const StyledLink = ({ children, to, variant, onClick }) => {
  let linkStyle;
  if (variant === "ghost") linkStyle = "transition hover:opacity-70";
  if (variant === "primary")
    linkStyle =
      "px-4 py-1 transition bg-blue-300 rounded hover:bg-blue-200 m-auto";
  return (
    <Link to={to} className={linkStyle} onClick={onClick}>
      {children}
    </Link>
  );
};

export default StyledLink;
