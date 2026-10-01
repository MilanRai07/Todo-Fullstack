import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './Layout'
import HomeIndex from './pages/home/HomeIndex'
import VitalTask from "./pages/vitalTask/VitalTask";

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomeIndex />} />
          <Route path="vital" element={<VitalTask />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
