import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import BookList from './components/BookList';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/edit-book/:id" element={<EditBook />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;