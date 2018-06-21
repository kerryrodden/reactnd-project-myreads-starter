import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import './App.css'

class SearchBooks extends React.Component {

  static propTypes = {
    onShelfChange: PropTypes.func.isRequired
  }

  state = {
    query: '',
    results: []
  }

  updateQuery = (query) => {
    this.setState({ query })
    const trimmedQuery = query.trim();
    if (trimmedQuery === '') {
      this.setState({ results: [] })
    } else {
      BooksAPI.search(trimmedQuery).then((results) => {
        if (results && Array.isArray(results)) {
          this.setState({ results })
        } else {
          this.setState({ results: [] })
        }
      })
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" autoFocus placeholder="Search by title or author" value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.results.map((book) => (
              <li key={book.id}>
                <Book book={book} onShelfChange={this.props.onShelfChange} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks