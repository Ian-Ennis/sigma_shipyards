import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import MainMenu from "./MainMenu";

function App() {
  const title = <h1>Sigma Shipyards</h1>;

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main_menu" element={<MainMenu />} />
      </Routes>
    </div>
  );
}

export default App;

