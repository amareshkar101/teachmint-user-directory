import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LandingPage from "./pages/LandingPage";
// import Home from "./pages/Home";
// import Postdetails from "./pages/Postdetails";
import "./App.css";
import UserDirectory from "./pages/userDirectory/UserDirectory";
import UserProfile from "./pages/userProfile/UserProfile";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<UserDirectory />} />
          <Route path="/user-profile/:id" element={<UserProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
