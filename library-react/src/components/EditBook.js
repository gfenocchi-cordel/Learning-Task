import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

function EditBook() {
    const { id } = useParams(); // Access the 'id' parameter from the URL
    const [book, setBook] = useState({
      title: '',
      author: '',
      publisher: '',
      publishedDate: ''
    });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5082/api/books/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBook({ ...data, id }); // Spread the data and overwrite id just in case
      } catch (e) {
        console.error('Fetching book failed:', e);
        setError('Failed to fetch book details.');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]); // Only `id` is a dependency now

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5082/api/books/${book.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...book, id: parseInt(id) })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Assume response is success without checking response body
      alert('Book updated successfully');
    } catch (e) {
      console.error('Updating book failed:', e);
      setError('Failed to update book.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Book</h2>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={book.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={book.author}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="publisher">Publisher:</label>
        <input
          type="text"
          id="publisher"
          name="publisher"
          value={book.publisher}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="publishedDate">Published Date:</label>
        <input
          type="date"
          id="publishedDate"
          name="publishedDate"
          value={book.publishedDate}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Update Book</button>
    </form>
  );
}

export default EditBook;
