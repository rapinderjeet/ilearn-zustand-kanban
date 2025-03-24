import './App.css';
import Column from './components/Column';

function App() {
  return (
    <div className="board">
      <div className='boardTitle'>Board</div>
      <div className="app">
        <Column state="PLANNED" />
        <Column state="ONGOING" />
        <Column state="DONE" />
      </div>
    </div>
  );
}

export default App;
