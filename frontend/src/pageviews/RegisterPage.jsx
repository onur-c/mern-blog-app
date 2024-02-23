import { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { delay } from "../utils/delay";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length >= 4 && password.length >= 4) {
      setError("");
      const res = await fetch("/register", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status == 200) {
        setMessage(
          "User created successfully. Your are being redirected to login page."
        );
        await delay(1000);
        navigate("/login");
      } else if (res.status == 400) {
        setError("Username already exists.");
        return;
      }
    } else {
      setError("Username and Password should be at least 4 characters.");
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center gap-3"
      onSubmit={handleSubmit}
    >
      <h1>Register </h1>
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
          onChange={(e) => {
            setUsername(e.target.value);
            setError("");
          }}
          autoFocus
        />
      </label>
      <label className="flex flex-col gap-1">
        Password
        <input
          type="password"
          className="p-2 rounded bg-black/5"
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
        />
      </label>
      <Button variant="ghost">Register</Button>
    </form>
  );
};

export default RegisterPage;
