import React from 'react'
import Book from './Book'
import './App.css'

class BookShelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) => (
              <li key={book.id}>
                <Book title={book.title} authors={book.authors} thumbnailUrl={book.imageLinks.smallThumbnail} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf