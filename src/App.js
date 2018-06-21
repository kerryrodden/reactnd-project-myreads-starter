import React from 'react'
import { Link, Route } from 'react-router-dom'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeShelf = (book, newShelf) => {
    book.shelf = newShelf
    let updatedBooks = this.state.books
    if (this.state.books.some((currentBook) => book.id === currentBook.id)) {
      // Book is already in our list, so just update it
      updatedBooks = this.state.books.map((currentBook) => (book.id === currentBook.id) ? book : currentBook)
    } else {
      // Add the book to our list
      updatedBooks = this.state.books.concat([book])
    }
    this.setState({ books: updatedBooks })
    BooksAPI.update(book, newShelf)
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf onShelfChange={this.changeShelf} title="Currently Reading" books={this.state.books.filter((book) => book.shelf === "currentlyReading")}/>
                <BookShelf onShelfChange={this.changeShelf} title="Want to Read" books={this.state.books.filter((book) => book.shelf === "wantToRead")}/>
                <BookShelf onShelfChange={this.changeShelf} title="Read" books={this.state.books.filter((book) => book.shelf === "read")}/>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )} />

        <Route path='/search' render={() => (
          <SearchBooks onShelfChange={this.changeShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp
