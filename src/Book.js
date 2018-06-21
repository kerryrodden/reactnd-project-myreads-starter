import React from 'react'
import PropTypes from 'prop-types'
import './App.css'

const BOOK_WIDTH = 128

class Book extends React.Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  render() {
    const book = this.props.book;
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover">
            {book.imageLinks && book.imageLinks.thumbnail && (
              <img width={BOOK_WIDTH} src={book.imageLinks.thumbnail} alt="" />
            )}
          </div>
          <div className="book-shelf-changer">
            <select value={book.shelf ? book.shelf : 'none'} onChange={(event) => this.props.onShelfChange(book, event.target.value)}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors && (
          <div className="book-authors">{book.authors.join(', ')}</div>
        )}
      </div>
    )
  }
}

export default Book