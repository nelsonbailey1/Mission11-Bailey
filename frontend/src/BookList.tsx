import { useEffect, useState } from "react";
import { Book } from "./types/Book";

function BookList()
{
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortAscending, setSortAscending] = useState<boolean>(true);
    const [sortedBooks, setSortedBooks] = useState<Book[]>([]);


    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch(
                `https://localhost:5011/api/Book?pageSize=${pageSize}&pageNum=${pageNum}`
            );
            const data = await response.json();
            setBooks(data.books)
            setTotalItems(data.totalBooks)
            setTotalPages(Math.ceil(totalItems / pageSize));
        }

        fetchBooks();
    }, [pageSize, pageNum]);

    const sortBooks = () => {
        const sorted = [...books].sort((a, b) =>
            sortAscending
                ? a.title.localeCompare(b.title) // Ascending order
                : b.title.localeCompare(a.title) // Descending order
        );
        setSortedBooks(sorted);
        setSortAscending(!sortAscending); // Toggle sort order
    };

    useEffect(() => {
        setSortedBooks(books); // ✅ Keep sortedBooks updated when books change
    }, [books]);

    return (

        <>
            <h1>Bookstore</h1>
            <br />

            <button onClick={sortBooks}>
                Sort by Title {sortAscending ? "▲" : "▼"} 
            </button>

            <br />

            {sortedBooks.map((b) =>
                <div id="bookCard" className="card" key={b.bookID}>
                    <h3 className="card-title">{b.title}</h3>
                    <div className="card-body">                    
                        <ul className="list-unstyled">
                            <li><strong>Author:</strong> {b.author}</li>
                            <li><strong>Publisher:</strong> {b.publisher}</li>
                            <li><strong>ISBN:</strong> {b.isbn}</li>
                            <li><strong>Classification:</strong> {b.classification}</li>
                            <li><strong>Category:</strong> {b.category}</li>
                            <li><strong>Page Count:</strong> {b.pageCount}</li>
                            <li><strong>Price:</strong> ${b.price}</li>
                        </ul>
                    </div>
                </div>

            )}

            <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>Previous</button>

            {[...Array(totalPages)].map((_, i) =>(
                    <button key={i+1} onClick={() => setPageNum(i + 1)} disabled={pageNum === (i + 1)}>
                        {i + 1}
                    </button>
            ))}

            <button disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button>

            <br/>
            <label>Results per page: </label>
            <select 
            value={pageSize} 
            onChange={(p) => {
                setPageSize(Number(p.target.value));
                setPageNum(1);
            }}
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
            </select>

        </>

    );  

}

export default BookList;