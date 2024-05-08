import React, { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookList from './BookList';

const mockBooks = [
    { id: 0, title: 'Book 1', author: 'Author 1', description: 'Description 1' },
    { id: 1, title: 'Book 2', author: 'Author 2', description: 'Description 2' },
    { id: 2, title: 'Book 3', author: 'Author 3', description: 'Description 3' },
];

test('renders book list with correct titles and authors', () => {
    render(<BookList books={mockBooks} selectBook={() => {}} />);
    
    mockBooks.forEach((book) => {
        const bookElement = screen.getByText(`${book.title} - ${book.author}`);
        expect(bookElement).toBeInTheDocument();
    });
});

test('calls selectBook function when a book is clicked', () => {
    const selectBookMock = jest.fn();
    render(<BookList books={mockBooks} selectBook={selectBookMock} />);
    
    const bookElement = screen.getByText(`${mockBooks[0].title} - ${mockBooks[0].author}`);
    fireEvent.click(bookElement);
    
    expect(selectBookMock).toHaveBeenCalledWith(mockBooks[0].id);
});

test('applies "selected" class to the clicked book', () => {
    render(<BookList books={mockBooks} selectBook={() => {}} />);
    
    const bookElement = screen.getByTestId(`book-list-body-tr-${mockBooks[1].id}`);
    fireEvent.click(bookElement);
    
    expect(bookElement).toHaveClass('selected');
});
