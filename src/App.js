import * as Icon from "react-bootstrap-icons";

import logo from "./logo.png";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="actionButtons">
          <button type="button" className="btn btn-primary btn-lg">
          New LAD Spec <Icon.ShieldPlus /> 
          </button>
          <button type="button" className="btn btn-secondary btn-lg">
            Edit a LAD  <Icon.LayoutWtf />
          </button>
          <button type="button" className="btn btn-secondary btn-lg">
            Library <Icon.Collection />
          </button>
          <button type="button" className="btn btn-secondary btn-lg">
            Creation rules <Icon.GearWideConnected />
          </button>
        </div>
        <hr/>
      </header>
      
      <main className="App-header">
        <p>
          I love beagles <em>so</em> much! Like, really, a lot. They’re adorable
          and their ears are so, so snuggly soft!
        </p>
      </main>
      <footer>(c)Madjid SADALLAH</footer>
    </div>
  );
}

export default App;
