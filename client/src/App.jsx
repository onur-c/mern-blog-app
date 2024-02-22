import { Route, Routes } from "react-router-dom";
import HomePage from "./pageviews/HomePage";
import LoginPage from "./pageviews/LoginPage";
import RegisterPage from "./pageviews/RegisterPage";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/register"} element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
