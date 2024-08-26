import { React, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";

function App() {
  const [showPlus, setShowPlus] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const togglePlus = () => {
    setShowPlus(prevShowPlus => !prevShowPlus);
  };

  const toggleModal = () => {
    setModalOpen(prevModalOpen => !prevModalOpen);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/dashboard"
          element={
            <>
              <Header 
                showPlus={showPlus} 
                toggleModal={toggleModal}
                modalOpen={modalOpen}
              />
              <Dashboard 
                togglePlus={togglePlus} 
                toggleModal={toggleModal}
                modalOpen={modalOpen}
              />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
