import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/Login.js";
import Navbar from "./component/Navbar";
function App() {
  return (
    <Router>
        <Navbar/>
        <Routes>
          <Route path="/"  element={<Home/>}/>
          <Route  path="/signin" element={<Login/>}/>
        </Routes>
      </Router>
  );
}

export default App;
