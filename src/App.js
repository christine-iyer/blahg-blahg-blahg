import Header from './components/Header/Header';
import NewBlahg from './components/NewBlahg/NewBlahg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
   
        <>
          <NewBlahg />
        </>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <>
      <Header></Header>
      </>

    </div>
  );
}

export default App;
