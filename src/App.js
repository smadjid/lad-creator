import MainActionButtons from "./components/main-action-buttons";
import logo from "./logo.png";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <hr/>
      </header>
      
      <main className="App-header">
      <MainActionButtons />
        <p>
          The <em>LAD Creator</em> tool is a part of the <a href='http://padlad.github.io/'>PadLAD project</a>
        </p>
      </main>
      <footer>(c)Madjid SADALLAH</footer>
    </div>
  );
}

export default App;
