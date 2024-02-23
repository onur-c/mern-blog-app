import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link className="text-2xl font-bold" to="/">
      <span className="text-blue-600">B</span>log
    </Link>
  );
};

export default Logo;
