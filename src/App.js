import './App.css';
import FilmPage from './components/filmPage/FilmPage';
import Header from './header/Header';
import { Routes, Route, Navigate } from "react-router-dom";
import FilmInside from './components/filmInside/FilmInside';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<Navigate to="/popular/1" replace />} />
          <Route path="/:category/:page" element={<FilmPage />} />
          <Route path="/:category/film/:filmId" element={<FilmInside />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
