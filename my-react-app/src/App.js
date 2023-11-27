import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage/HomePage';

function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Additional routes can be added here */}
        </Routes>
      </Router>
    );
}

export default App;
