import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './Layout'
import HomeIndex from './pages/home/HomeIndex'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomeIndex />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
