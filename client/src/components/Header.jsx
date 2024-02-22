import StyledLink from "./StyledLink";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="flex items-center justify-between h-12 px-4 md:px-24 lg:px-40 border-b-[1px] border-b-black/5 border-solid">
      <Logo />
      <div className="space-x-2">
        <StyledLink to={"/login"} variant="primary">
          Login
        </StyledLink>
        <StyledLink to={"/register"} variant="ghost">
          Register
        </StyledLink>
      </div>
    </header>
  );
};

export default Header;
