import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/Login.js";
import Navbar from "./component/Navbar";
import History from "./component/History";
import VideoState from "./context/VideoState";
import Schedule from "./component/Schedule";
import Roomform from "./component/Roomform.js";
import Userinroom from "./component/Userinroom.js";
import Meetpage from "./component/Meetpage.js";
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
          <Route path="/room" element={<Roomform  />} />
          <Route path="/room/:roomid" element={<Userinroom  />} />
          <Route path="/room/:roomid/live" element={<Meetpage  />} />
          

        </Routes>
      </Router>
    </VideoState>
  );
}

export default App;
