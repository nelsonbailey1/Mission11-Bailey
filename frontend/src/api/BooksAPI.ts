import BookList from "../components/BookList";
import { Book } from "../types/Book";

interface FetchBookResponse {
    books: Book[];
    totalNumBooks: number;
};

const API_URL = 'https://bookstore-bailey-backend.azurewebsites.net/api';

export const fetchBooks = async (
    pageSize: number,
    pageNum: number,
    selectedCategories: string[],
): Promise<FetchBookResponse> => {

    try{
        const categoryParams = selectedCategories.map((cat) => `Categories=${encodeURIComponent(cat)}`).join('&');
        const response = await fetch(
            `${API_URL}/Book?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`,
            {
                credentials: "include"
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch books');
            
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
    
};

export const addBook = async (newBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/Book/AddBook`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBook)
        });

        if(!response.ok) {
            throw new Error('Failed to add book')
        }

        return await response.json();
    } catch(error) {
        console.error('Error adding book:', error);
        throw error;
    }
};

export const updateBook = async (bookId: number, updatedBook: Book) : Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/Book/UpdateBook/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBook)
        });

        return await response.json();
    } catch (error) {
        console.error('Error updating book:', error)
        throw error;
    }
}

export const deleteBook = async (bookId: number): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/Book/DeleteBook/${bookId}`,
        {method: 'DELETE'})

        if (!response.ok) {
            throw new Error('Failed to delete book.');
        }
    } catch (error) {
        console.error('Error deleting Book', error)
        throw error;
    }
};