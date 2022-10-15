import './App.css';
import RestApi from "./Api";
import NavBar from './components/header';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <RestApi />
    </div>
  );
}

export default App;
