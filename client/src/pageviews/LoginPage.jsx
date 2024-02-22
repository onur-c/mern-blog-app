import Button from "../components/Button";

const LoginPage = () => {
  return (
    <form className="flex flex-col items-center justify-center gap-3 ">
      <h1>Login </h1>
      <label className="flex flex-col gap-1">
        Username
        <input type="text" className="p-2 rounded bg-black/5" />
      </label>
      <label className="flex flex-col gap-1">
        Password
        <input type="text" className="p-2 rounded bg-black/5" />
      </label>
      <Button>Login</Button>
    </form>
  );
};
export default LoginPage;
