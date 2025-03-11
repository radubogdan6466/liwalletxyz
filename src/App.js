import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import Navbar from "./components/Navbar/Navbar"; // Import the Navbar component
import MainTools from "./pages/Tools/MainTools";
import NoMatch from "./pages/NoMatch/NoMatch";
import BalanceChecker from "./pages/Tools/BalanceChecker";
import "./App.css";
import Scramble from "./pages/Tools/Scramble";
// import Exam from "./pages/exam/Exam";
// import PdfPage from "./pages/exam/pdfs/PdfFiles.js";

function App() {
  return (
    <Router basename="/">
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<MainTools />} />
          <Route path="/tools/BalanceChecker" element={<BalanceChecker />} />
          <Route path="/tools/scramble" element={<Scramble />} />
          {/* <Route path="/Exam" element={<Exam/>}/>
          <Route path="/pdfs" element={<PdfPage/>}/> */}

          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
