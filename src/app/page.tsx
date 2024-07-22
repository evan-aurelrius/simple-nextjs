'use client';

import { useState } from 'react';
import { Book } from '../types';

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [showTable, setShowTable] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');

  const fetchBooks = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/books');
    const data: Book[] = await res.json();
    setBooks(data);
    setShowTable(true);
  };

  const createBook = async (event: React.FormEvent) => {
    event.preventDefault();
    const newBook = { title, author, publishedYear: parseInt(publishedYear) };

    const res = await fetch('http://127.0.0.1:8000/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    });

    if (res.ok) {
      // Clear the form inputs
      setTitle('');
      setAuthor('');
      setPublishedYear('');
      // Fetch the updated list of books
      fetchBooks();
    } else {
      console.error('Failed to create book');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', minHeight: '100vh' }}>
      <h2 style={{ fontSize: "1.5rem" }}>Add New Book</h2>
      <form onSubmit={createBook} style={{ marginBottom: '20px' }}>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginRight: '10px', padding: '8px', color: 'black' }}
            required
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{ marginRight: '10px', padding: '8px', color: 'black' }}
            required
          />
          <input
            type="number"
            placeholder="Published Year"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            style={{ marginRight: '10px', padding: '8px', color: 'black' }}
            required
          />
          <button type="submit" style={{ backgroundColor: 'green', padding: '10px', borderRadius: '8px', color: 'white' }}>Add Book</button>
        </div>
      </form>

      <button onClick={fetchBooks} style={{ backgroundColor: 'blue', padding: '10px', borderRadius: '8px', color: 'white', marginBottom: '20px' }}>Fetch Books</button>

      {showTable && books.length > 0 && (
        <table style={{ margin: '20px auto', borderCollapse: 'collapse', width: '80%' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>ID</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Title</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Author</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Published Year</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td style={{ border: '1px solid black', padding: '8px' }}>{book.id}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{book.title}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{book.author}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{book.publishedYear}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
