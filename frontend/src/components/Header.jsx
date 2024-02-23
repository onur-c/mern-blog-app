import { LogOutIcon, Settings } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext.jsx";
import profileImgUrl from "../public/profile-placeholder.jpg";
import Button from "./Button";
import Logo from "./Logo";
import StyledLink from "./StyledLink";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const toggleModal = () => {
    setIsSettingsOpen((prev) => !prev);
  };

  const { userInfo, setUserInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("/profile", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUserInfo(data));
  }, [setUserInfo]);

  const logout = async () => {
    await fetch("/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between h-20 px-4 md:px-24 lg:px-40 border-b-[1px] border-b-black/5 border-solid">
      <Logo />
      <div className="flex items-center justify-center gap-2">
        {!userInfo?.username.length ? (
          <>
            <StyledLink to={"/login"} variant="primary">
              Login
            </StyledLink>
            <StyledLink to={"/register"} variant="ghost">
              Register
            </StyledLink>
          </>
        ) : (
          <>
            {/* Desktop */}
            <div className="items-center hidden gap-4 sm:flex">
              <div className="flex flex-col">
                <p className="text-xs opacity-50">Username</p>
                <p className="text-sm font-bold">{userInfo.username}</p>
              </div>
              <img
                className="object-cover rounded-full size-7"
                src={profileImgUrl}
              />
              <StyledLink to={"/create"} variant="primary">
                Create Article
              </StyledLink>
              <Button onClick={logout} variant="ghost">
                Logout
              </Button>
            </div>
            {/* Mobile */}
            <div className="flex items-center gap-2 sm:hidden">
              <div className="flex flex-col">
                <p className="text-xs opacity-50">Username</p>
                <p className="text-sm font-bold">{userInfo.username}</p>
              </div>
              <img
                className="object-cover rounded-full size-7"
                src={profileImgUrl}
                alt="Photo by Nguyễn Hiệp on Unsplash"
              />
              <div className="relative flex items-center justify-center">
                <button type="button" onClick={toggleModal}>
                  <Settings size={20} strokeWidth={1.25} />
                </button>
                <div
                  className={`${
                    isSettingsOpen
                      ? "absolute -bottom-28 -left-24  border border-solid px-4 py-4 opacity-100"
                      : "absolute  -bottom-28 -left-24 border border-solid px-4 py-4 opacity-0"
                  }  bg-white flex flex-col items-start justify-center transition duration-500 text-xs gap-4`}
                >
                  <Button onClick={logout} variant={"ghost"}>
                    <div className="flex items-center gap-2">
                      <LogOutIcon size={12} strokeWidth={1.25}></LogOutIcon>
                      <p>Logout</p>
                    </div>
                  </Button>
                  <StyledLink
                    to={"/create"}
                    variant={"primary"}
                    onClick={toggleModal}
                  >
                    Create Article
                  </StyledLink>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
