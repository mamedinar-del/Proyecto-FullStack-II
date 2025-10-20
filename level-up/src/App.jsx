import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

import Index from './components/Index';
import AboutUs from './components/AboutUs';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/index" element={<Index />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App
