import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalNavbar from './components/GlobalNavbar';
import InsertForm from './components/InsertForm';
import EventsTable from './components/EventsTable';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const mock = [
  {
    id: "1",
    name: "T1",
    date: "2022-01-01T12:00:00Z"
  },
  {
    id: "2",
    name: "T2",
    date: "2022-01-02T12:00:00Z"
  },
]

function App() {
  return (
    <div className="App">
      <header className="Header">
        <GlobalNavbar/>
      </header>
      <div className='Middle'>
        <div className='InsertForm'>
          <InsertForm/>
        </div>
        <div className='EventsTable'>
          <EventsTable
            records={mock}
          />
        </div>
      </div>
      <footer className='Footer'>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Developed by Thiago Abad</Navbar.Brand>
          </Container>
        </Navbar>
      </footer>
    </div>
  );
}

export default App;
