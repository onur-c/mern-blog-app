import { useContext, useState } from "react";
import { delay } from "../utils/delay";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { UserContext } from "../context/UserContext";

const LoginPage = () => {
  const navigate = useNavigate();

  const { setUserInfo } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.length >= 4 && password.length >= 4) {
      setError("");
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status == 200) {
        setMessage(
          "Logged in successfully. Your are being redirected to home page."
        );
        setUserInfo(await res.json());
        await delay(1000);
        navigate("/");
      } else if (res.status == 400) {
        setError("Wrond credentials.");
        return;
      }
    } else {
      setError("Username and Password should be at least 4 characters.");
    }
  };
  return (
    <form
      className="flex flex-col items-center justify-center gap-3 "
      onSubmit={handleSubmit}
    >
      <h1>Login </h1>
      <p className="text-sm font-bold text-green-400 opacity-70 animate-pulse">
        {message}
      </p>
      <p className="text-sm font-bold text-red-400 opacity-70 animate-pulse">
        {error}
      </p>
      <label className="flex flex-col gap-1">
        Username
        <input
          type="text"
          className="p-2 rounded bg-black/5"
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label className="flex flex-col gap-1">
        Password
        <input
          type="password"
          className="p-2 rounded bg-black/5"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <Button variant="primary">Login</Button>
    </form>
  );
};
export default LoginPage;
