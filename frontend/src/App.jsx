import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './Layout'
import HomeIndex from './pages/home/HomeIndex'
import VitalTask from "./pages/vitalTask/VitalTask";
import AllTask from "./pages/allTask/AllTask";
import SingleTodo from "./component/singlePage/SingleTodo";
import AddTask from "./pages/addTask/AddTask";

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomeIndex />} />
          <Route path="/vital" element={<VitalTask />} />
          <Route path="/all-tasks" element={<AllTask />} />
          <Route path="/single-todo" element={<SingleTodo />} />
          <Route path="/add-new-task" element={<AddTask />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
