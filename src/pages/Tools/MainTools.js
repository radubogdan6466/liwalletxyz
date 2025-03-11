import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MainTools.css";
import BalanceChecker from "./BalanceChecker";

const MainTools = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleShowBalanceChecker = () => {
    setActiveComponent("balanceChecker");
  };

  return (
    <div className="MainToolsComponent">
      <div className="MainToolsElements">
        <h2>
          <Link to="/tools/scramble">Scramble</Link>
        </h2>
      </div>
      <div className="MainToolsElements" onClick={handleShowBalanceChecker}>
        <h2>
          <Link to="/tools/balanceChecker">Balance checker</Link>
        </h2>
      </div>
      {/* <div className="MainToolsElements">
        <h2>
          <Link to="/pdfs">Accesează PDF-uri</Link>
        </h2>
      </div>
      <div className="MainToolsElements">
        <h2>
          <Link to="/exam">Accesează exam</Link>
        </h2>
      </div> */}

      {/* Conditionally render the BalanceChecker component */}
      {activeComponent === "balanceChecker" && <BalanceChecker />}
    </div>
  );
};

export default MainTools;
