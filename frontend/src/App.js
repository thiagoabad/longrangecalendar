import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalNavbar from './components/GlobalNavbar';
import MainScreenCard from './components/MainScreenCard';

function App() {
  return (
    <div className="App">
      <div className="Header">
        <GlobalNavbar/>
      </div>
      <header className="App-header">
        <MainScreenCard
          title="Test"
          text="Test"
        />
      </header>
    </div>
  );
}

export default App;
