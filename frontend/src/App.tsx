import React, { useEffect } from 'react';
import './App.css';
import { Book, NewBook } from './types';
import BookForm from './components/book_form/BookForm';
import BookList from './components/book_list/BookList';
import {
    fetchBooks,
    createBook,
    updateBook,
    deleteBook
} from './api/api';
import { Spinner } from './components/spinner/Spinner';

/**
 * The main component of the application.
 * Renders the booklist, book form, and book list components.
 */
const App: React.FC = () => {
    const [books, setBooks] = React.useState<Book[]>([]);
    const [selectedBook, setSelectedBook] = React.useState<Book | undefined>(undefined);
    const [loading, setLoading] = React.useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const results = await fetchBooks()
            setLoading(false);

            if (results.status === 200) {
                setBooks(results.data as Book[]);
            } else {
                console.error('Error fetching books:', results.errors);
            }
        };
        fetchData();
    }, []);

    const saveBook = async (book: Book | NewBook) => {
        try {
            if ('id' in book) {
                setLoading(true);
                const results = await updateBook(book);
                setLoading(false);

                if (results && results.data) {
                    const updatedBook: Book = results.data as Book;
                    setBooks(
                        [
                            ...books.filter((b) => b.id !== updatedBook.id),
                            updatedBook
                        ].sort(
                            (a, b) => a.id - b.id
                        )
                    );

                    return updatedBook.id;
                }

            } else {
                setLoading(true);
                const results = await createBook(book);
                setLoading(false);

                if (results && results.data) {
                    const newBook: Book = results.data as Book;
                    console.log('newBook: ', newBook);
                    setBooks([...books, newBook]);

                    return newBook.id;
                }

            }

        } catch (error) {
            console.error('Error saving book:', error);
            return undefined;
        }
    };

    const removeBook = async (id: number) => {
        setLoading(true);
        const results = await deleteBook(id);
        setLoading(false);

        setBooks(books.filter((book) => book.id !== id));
        setSelectedBook(undefined);

        return results.data;
    };

    const selectBook = (id: number) => {
        setSelectedBook(books.find((book) => book.id === id));
    };

    const Content: JSX.Element = (
        <div>
            <BookForm
                book={selectedBook}
                saveBook={saveBook}
                deleteBook={removeBook}
            />
            <BookList
                books={books}
                selectBook={selectBook}
            />
        </div>
    );

    const getContent: JSX.Element = loading ? Spinner : Content;

    return (
        <div id='container'>
            <h1>Booklist</h1>
            {getContent}
        </div>
    )
};

export default App;
