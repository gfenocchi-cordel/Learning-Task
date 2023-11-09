import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function BookList() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState('title');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  
  const navigate= useNavigate();

  const fetchBooks = useCallback(async () => {
    setLoading(true);

    const queryParams = new URLSearchParams({
      search: searchTerm, // This includes search with an empty string if searchTerm is ''
      sort: sort,
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    }).toString();
  
    try {
      const response = await fetch(`http://localhost:5082/api/books?${queryParams}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Fetching books failed:', error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, sort, pageNumber, pageSize]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    fetchBooks();
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(e.target.value);
  };

  const goToNextPage = () => setPageNumber(pageNumber + 1);
  const goToPrevPage = () => setPageNumber(pageNumber - 1);

  const deleteBook = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const response = await fetch(`http://localhost:5082/api/books/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Refresh the book list
        fetchBooks();
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  const editBook = (id) => {
    console.log(id);
    navigate(`/edit-book/${id}`);
  };

  return (
    <div className="bookListContainer">
      <h2>Book Registry</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search..."
        className="searchInput"
      />
      <button onClick={handleSearch} className="bookListButton">Search</button>
      <select value={sort} onChange={handleSortChange} className="sortSelect">
        <option value="title">Title</option>
        <option value="title_desc">Title Descending</option>
      </select>
      <select value={pageSize} onChange={handlePageSizeChange} className="pageSizeSelect">
        <option value="5">5 per page</option>
        <option value="10">10 per page</option>
      </select>
      <button onClick={goToPrevPage} disabled={pageNumber <= 1} className="bookListButton">
        Previous
      </button>
      <button onClick={goToNextPage} className="bookListButton">
        Next
      </button>

      {loading ? (
        <p>Loading books...</p>
      ) : (
        <ul className="bookList">
          {books.map((book) => (
            <li key={book.id} className="bookListItem">
              <h3 className="bookTitle">{book.title}</h3>
              <p className="bookAuthor">Author: {book.author}</p>
              <p className="bookId">ID: {book.id}</p>
              <button onClick={() => editBook(book.id)} className="editButton">Edit</button>
              <button onClick={() => deleteBook(book.id)} className="deleteButton">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookList;
