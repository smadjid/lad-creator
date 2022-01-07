import React from "react";
import MainDash from "./components/main-dash";
import logo from "./logo.png";
import labsticc from "./labsticc_logo.png";
import imt from "./imt_logo.png";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="main-head">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={imt} className="Inst-logo" alt="IMT Atlantique" />
          <img src={labsticc} className="Inst-logo" alt="LabSTICC" />
          <b> </b>
        </div>
        
      </header>

      <main className="App-main">
        <MainDash />
     
      </main>
    
    </div>
  );
}

export default App;
