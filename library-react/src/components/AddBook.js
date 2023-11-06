import React, { useState } from 'react';

function AddBook() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher: '',
    publishedDate: '',
    id: ''
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
    <form onSubmit={handleSubmit}>
      <h2>Add a New Book</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Author:</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Publisher:</label>
        <input
          type="text"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Published Date:</label>
        <input
          type="date"
          name="publishedDate"
          value={formData.publishedDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>ID:</label>
        <input
          type="number"
          name="id"
          value={formData.id}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
}

export default AddBook;
