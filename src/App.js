// src/App.js
import { React, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";

function App() {
  const [showPlus, setShowPlus] = useState(false);

  const togglePlus = () => {
    console.log("toggle plus called", showPlus)
    setShowPlus(prevShowPlus => !prevShowPlus);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/dashboard"
          element={
            <>
              <Header showPlus={showPlus} />
              <Dashboard togglePlus={togglePlus} />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
