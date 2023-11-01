import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/Login.js";
import Navbar from "./component/Navbar";
import History from "./component/History";
import VideoState from "./context/VideoState";
import Schedule from "./component/Schedule";
function App() {
  return (
    <VideoState>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/history" element={<History />} />
          <Route path="/schedulemeating" element={<Schedule  />} />

        </Routes>
      </Router>
    </VideoState>
  );
}

export default App;
