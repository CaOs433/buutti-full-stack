import React, { useEffect, useState } from 'react';
import { Book, NewBook } from '../../types';
import './BookForm.css';

interface BookFormProps {
    book: Book | undefined;
    saveBook: (book: Book | NewBook) => Promise<number | undefined>;
    deleteBook: (id: number) => Promise<boolean>;
};

/**
 * Represents a form for creating or editing a book.
 *
 * @component
 * @param {BookFormProps} props - The component props.
 * @param {Book} props.book - The book object to be edited.
 * @param {Function} props.saveBook - The function to save the book.
 * @param {Function} props.deleteBook - The function to delete the book.
 * @returns {JSX.Element} The BookForm component.
 */
const BookForm: React.FC<BookFormProps> = ({ book, saveBook, deleteBook }) => {
    const [id, setId] = useState<number | undefined>(book?.id);
    const [title, setTitle] = useState<string>(book?.title || '');
    const [author, setAuthor] = useState<string>(book?.author || '');
    const [description, setDescription] = useState<string>(book?.description || '');

    useEffect(() => {
        setId(book?.id);
        setTitle(book?.title || '');
        setAuthor(book?.author || '');
        setDescription(book?.description || '');
    }, [book]);

    const [formIsValid, setFormIsValid] = useState<boolean>(false);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        validateForm();
    };

    const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthor(e.target.value);
        validateForm();
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
        validateForm();
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validateForm();
    };

    const validateForm = () => {
        if (title.length > 0 && author.length > 0 && description.length > 0) {
            setFormIsValid(true);
        } else {
            setFormIsValid(false);
        }
    };

    const clearForm = () => {
        setId(undefined);
        setTitle('');
        setAuthor('');
        setDescription('');
    };

    const handleSave = () => {
        if (id !== undefined) {
            saveBook({
                id,
                title,
                author,
                description
            });
        }
    };

    const handleSaveNew = async () => {
        setId(
            await saveBook({
                title,
                author,
                description
            })
        );
    };

    const handleDelete = () => {
        if (id) {
            deleteBook(id);
            clearForm();
        }
    };

    return (
        <form onSubmit={handleFormSubmit} id='book-form'>
            <label htmlFor='title'>Title:</label><br />
            <input type='text' id='title' minLength={1} maxLength={100} value={title} onChange={handleTitleChange} required />
            <br />
            <label htmlFor='author'>Author:</label><br />
            <input type='text' id='author' minLength={1} maxLength={100} value={author} onChange={handleAuthorChange} required />
            <br />
            <label htmlFor='description'>Description:</label><br />
            <textarea id='description' minLength={1} maxLength={256} value={description} onChange={handleDescriptionChange} required />
            <br />
            <button type='button' className='save-new-button' onClick={handleSaveNew} disabled={!formIsValid}>Save New</button>
            <button type='button' className='save-button' onClick={handleSave} disabled={id === undefined || !formIsValid}>Save</button>
            <button type='button' className='delete-button' onClick={handleDelete} disabled={id === undefined}>Delete</button>
        </form>
    );
};

export default BookForm;
