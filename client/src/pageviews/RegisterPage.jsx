import { useState } from "react";
import Button from "../components/Button";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      console.log(res);
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center gap-3"
      onSubmit={handleSubmit}
    >
      <h1>Register </h1>

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
          type="text"
          className="p-2 rounded bg-black/5"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <Button>Register</Button>
    </form>
  );
};

export default RegisterPage;
