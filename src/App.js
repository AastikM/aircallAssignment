import "./App.css";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <div className="container-view">
          <Main/>
        </div>
      </div>
    </div>
  );
}

export default App;
