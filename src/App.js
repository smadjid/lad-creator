import logo from "./logo.png";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="actionButtons">
          <button type="button">Change Color</button>
          <button type="button">Change Color</button>
          <button type="button">Change Color</button>
        </div>
      </header>
      <main className="App-header">
        <p>
          I love beagles <em>so</em> much! Like, really, a lot. They’re adorable
          and their ears are so, so snuggly soft!
        </p>
      </main>
    </div>
  );
}

export default App;
