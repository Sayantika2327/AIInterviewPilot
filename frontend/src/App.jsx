import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ResumeUpload from "./pages/ResumeUpload";
import ATS from "./pages/ATS";
import Interview from "./pages/Interview";
import Report from "./pages/Report";
import Resume from "./pages/Resume";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<ResumeUpload />} />
        <Route path="/ats" element={<ATS />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/report" element={<Report />} />
        <Route path="/resume" element={<Resume />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;