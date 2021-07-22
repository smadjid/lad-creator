import MainDash from "./components/main-dash";
import logo from "./logo.png";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="main-head">
          <img src={logo} className="App-logo" alt="logo" />
          <b> </b>
        </div>
        
      </header>

      <main className="App-main">
        <MainDash />
        <p>
          The <em>LAD Studio</em> tool is part of the{" "}
          <a href="http://padlad.github.io/">PadLAD project</a>
        </p>
      </main>
   
    </div>
  );
}

export default App;
