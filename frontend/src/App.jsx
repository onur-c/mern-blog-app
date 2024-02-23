import { Route, Routes } from "react-router-dom";
import HomePage from "./pageviews/HomePage";
import LoginPage from "./pageviews/LoginPage";
import RegisterPage from "./pageviews/RegisterPage";
import Layout from "./components/Layout";
import CreatePage from "./pageviews/CreatePage";
import PostPage from "./pageviews/PostPage";
import EditPage from "./pageviews/EditPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/register"} element={<RegisterPage />} />
          <Route path={"/create"} element={<CreatePage />} />
          <Route path={"/post/:id"} element={<PostPage />} />
          <Route path={"/edit/:id"} element={<EditPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
