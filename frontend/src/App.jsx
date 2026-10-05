import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from './Layout'
import HomeIndex from './pages/home/HomeIndex'
import VitalTask from "./pages/vitalTask/VitalTask";
import AllTask from "./pages/allTask/AllTask";
import SingleTodo from "./component/singlePage/SingleTodo";
import AddTask from "./pages/addTask/AddTask";
import Categories from "./pages/categories/Categories";
import ProfileIndex from "./pages/profile/ProfileIndex";
import PasswordChange from "./pages/passwordChange/PasswordChange";
import DeleteProfile from "./pages/deleteProfile/DeleteProfile";
import AuthPage from "./pages/authPage/AuthPage";

function App() {
  const isAuthenticated = false;
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <AuthPage />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <Layout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<HomeIndex />} />
          <Route path="/vital" element={<VitalTask />} />
          <Route path="/all-tasks" element={<AllTask />} />
          <Route path="/single-todo" element={<SingleTodo />} />
          <Route path="/add-new-task" element={<AddTask />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/profile" element={<ProfileIndex />} />
          <Route path="/password-change" element={<PasswordChange />} />
          <Route path="/delete-profile" element={<DeleteProfile />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
