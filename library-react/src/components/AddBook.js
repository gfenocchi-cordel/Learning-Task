import React, { useState } from 'react';
import './styles.css';

function AddBook() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher: '',
    publishedDate: '',
    blurb: '',
    numberOfPages: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5082/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      alert('Book added successfully');
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="addBookForm">
      <h2>Add a New Book</h2>
      <div className="formGroup">
        <label className="label">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="input"
        />
      </div>
      <div className="formGroup">
        <label className="label">Author:</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          className="input"
        />
      </div>
      <div className="formGroup">
        <label className="label">Publisher:</label>
        <input
          type="text"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
          className="input"
        />
      </div>
      <div className="formGroup">
        <label className="label">Published Date:</label>
        <input
          type="date"
          name="publishedDate"
          value={formData.publishedDate}
          onChange={handleChange}
          className="input"
        />
      </div>
      <div className="formGroup">
        <label className="label">ID:</label>
        <input
          type="number"
          name="id"
          value={formData.id}
          onChange={handleChange}
          className="input"
        />
      </div>
      <div className="formGroup">
        <label htmlFor="blurb" className="label">Blurb:</label>
        <textarea
          id="blurb"
          name="blurb"
          value={formData.blurb}
          onChange={handleChange}
          className="input"
          rows="4"
        />
      </div>
      <div className="formGroup">
        <label htmlFor="numberOfPages" className="label">Number of Pages:</label>
        <input
          type="number"
          id="numberOfPages"
          name="numberOfPages"
          value={formData.numberOfPages}
          onChange={handleChange}
          className="input"
        />
      </div>
      <button type="submit" className="submitButton">Add Book</button>
    </form>
  );
}

export default AddBook;
