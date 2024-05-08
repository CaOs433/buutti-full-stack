import axios, { AxiosResponse } from 'axios';
import { Book, NewBook } from '../types';

const BASE_URL = 'http://127.0.0.1:5000';

/**
 * Fetches books from the server.
 * Path: GET - /books/{id}
 * @returns A Results object that resolves to an array of books.
 */
export const fetchBooks = async () => {
    const url = BASE_URL+"/books";
    const result = await makeRequest<Book[]>(
        () => axios.get(url)
    );
    return result;
};

/**
 * Creates a new book on the server.
 * Path: POST - /books
 * @param newBook - The new book object to be created.
 * @returns A Results object that resolves to the created book.
 */
export const createBook = async (newBook: NewBook) => {
    const url = BASE_URL+"/books";
    const result = await makeRequest<Book>(
        () => axios.post(url, newBook, { headers: { 'Content-Type': 'application/json' } })
    );
    return result;
};

/**
 * Updates a book on the server.
 * Path: PUT - /books/{id}
 * @param book - The book object to be updated.
 * @returns A Results object that resolves to the updated book.
 */
export const updateBook = async (book: Book) => {
    const url = BASE_URL+"/books/"+book.id;
    const result = await makeRequest<Book>(
        () => axios.put(url, book)
    );
    return result;
};

/**
 * Deletes a book from the server.
 * Path: DELETE - /books/{id}
 * @param book - The book to be deleted.
 * @returns A Results object that resolves to the result of the deletion.
 */
export const deleteBook = async (id: number) => {
    const url = BASE_URL + "/books/" + id;
    const result = await makeRequest<true>(
        () => axios.delete(url)
    );
    return result;
};

/** Results object for a parsed Axios request results */
export interface Results {
    status: number;
    message: string;
    data: any | Book | NewBook | null;
    errors: string[];
}

/**
 * Make an axios request and parse results
 * @param req function that makes axios request and returns it's results
 * @returns parsed Results object
 */
export const makeRequest = async <Output>(
    req: () => Promise<AxiosResponse<any, any>>
): Promise<Results> => {
    let status: number = -1;
    let message: string = "";
    let parsedData: Output | null = null;
    let errors: string[] = [];

    try {
        const res = await req();
        status = res.status;

        const data = await res.data;
        console.log("Data: ", data);
        
        message = data.message || "";

        const parsed: Output = JSON.parse(JSON.stringify(data));
        console.log("Parsed: ", parsed);
        parsedData = parsed;

    } catch (error: any) {
        console.log("Error: ", error);

        status = error?.response?.status || -1;

        if (error.name === "NetworkError")
            message = `${error.name}`;
        else if (status === 400)
            errors = error.response.data.error || [];
    }

    return {
        status: status,
        message: message,
        data: parsedData,
        errors: errors
    }
}
