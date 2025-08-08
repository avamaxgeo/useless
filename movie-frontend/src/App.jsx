import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/genre/:genreId/:genreName" element={<ListPage />} />
        <Route path="/movie/:movieId" element={<DetailPage />} />
      </Routes>
    </div>
  );
}
export default App;