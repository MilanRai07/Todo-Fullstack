import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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
import ProfileEmailVerification from "./pages/profile/ProfileEmailVerification";
import { useCurrentUser } from "./hooks/useCurrentUserHook";


function App() {
  const { data, isPending, isError, error, refetch } = useCurrentUser();
  const isAuthenticated = data?.success === true;

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      {isPending ? (
        <main className="grid min-h-screen place-items-center" role="status">
          Checking your session...
        </main>
      ) : isError ? (
        <main className="grid min-h-screen place-items-center p-6 text-center">
          <div>
            <p role="alert">{error.message || "Unable to verify your session."}</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-4 rounded-md bg-primary px-4 py-2 text-white"
            >
              Try again
            </button>
          </div>
        </main>
      ) : (
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
            <Route path="/verify-email" element={<ProfileEmailVerification />} />
            <Route path="/password-change" element={<PasswordChange />} />
            <Route path="/delete-profile" element={<DeleteProfile />} />
          </Route>
        </Routes>
      )}
    </Router>
  )
}

export default App
