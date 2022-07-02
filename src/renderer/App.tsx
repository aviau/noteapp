import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HelloWorld from './components';

const Hello = () => {
  return (
    <div>
      <h1>Note App</h1>
      <HelloWorld name="copain" />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
