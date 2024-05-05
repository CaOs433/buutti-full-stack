import React, { useState } from 'react';
import { Book } from '../../types';
import './BookList.css';

interface BookListProps {
    books: Book[];
    selectBook: (id: number) => void;
};

/**
 * Renders a list of books.
 *
 * @component
 * @param {BookListProps} props - The component props.
 * @param {Array} props.books - The array of books to display.
 * @param {Function} props.selectBook - The function to call when a book is selected.
 * @returns {JSX.Element} The rendered BookList component.
 */
const BookList: React.FC<BookListProps> = ({ books, selectBook }) => {
    const [selectedBookId, setSelectedBookId] = useState<number | undefined>(undefined);

    const handleClick = (id: number) => {
        if (selectedBookId !== id) {
            setSelectedBookId(id);
            selectBook(id);
        }
    };

    return (
        <table id='book-list'>
            <thead>
                <tr>
                    <th>Book</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, index) => (
                    <tr key={index} onClick={() => handleClick(book.id)} className={selectedBookId === book.id ? 'selected' : ''}>
                        <td>{book.title} - {book.author}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default BookList;
