import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EntertainersPage from './pages/EntertainersPage';
import EntertainerDetailPage from './pages/EntertainerDetailPage';
import AddEntertainerPage from './pages/AddEntertainerPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <NavBar /> {/* ✅ Add it here */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/entertainers" element={<EntertainersPage />} />
        <Route path="/entertainers/new" element={<AddEntertainerPage />} />
        <Route path="/entertainers/:id" element={<EntertainerDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
