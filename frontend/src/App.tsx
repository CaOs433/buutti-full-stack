import React from 'react';
import './App.css';
import { Book, NewBook } from './types';
import BookForm from './components/book_form/BookForm';
import BookList from './components/book_list/BookList';
import sampleBooks from './sample_data.json';

/**
 * The main component of the application.
 * Renders the booklist, book form, and book list components.
 */
const App: React.FC = () => {
    const [books, setBooks] = React.useState<Book[]>(sampleBooks);
    const [selectedBook, setSelectedBook] = React.useState<Book | undefined>(undefined);

    const saveBook = (book: Book | NewBook) => {
        if ('id' in book) {
            setBooks(books.map((b) => b.id === book.id ? book : b));
            return book.id;
        } else {
            const newBook = { ...book, id: books.length + 1 };
            setBooks([...books, newBook]);
            return newBook.id;
        }
    };

    const deleteBook = (id: number) => {
        setBooks(books.filter((book) => book.id !== id));
        return true;
    };

    const selectBook = (id: number) => {
        setSelectedBook(books.find((book) => book.id === id));
    };

    return (
        <div id='container'>
            <h1>Booklist</h1>
            <div>
                <BookForm
                    book={selectedBook}
                    saveBook={saveBook}
                    deleteBook={deleteBook}
                />
                <BookList
                    books={books}
                    selectBook={selectBook}
                />
            </div>
        </div>
    )
};

export default App;
