import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="App-content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/pokemon/:name' element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
