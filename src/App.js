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
        <hr />
      </header>

      <main className="App-main">
        <MainDash />
        <p>
          The <em>LAD Creator</em> tool is a part of the{" "}
          <a href="http://padlad.github.io/">PadLAD project</a>
        </p>
      </main>
      <footer>(c)Madjid SADALLAH</footer>
    </div>
  );
}

export default App;