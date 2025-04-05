import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../api/BooksAPI";

function BookList({selectedCategories}: {selectedCategories: string[] }) {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortAscending, setSortAscending] = useState<boolean>(true);
    const [sortedBooks, setSortedBooks] = useState<Book[]>([]);
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBooks = async () => {

            try {
                setLoading(true);
                const data = await fetchBooks(pageSize, pageNum, selectedCategories);
                
                setBooks(data.books);
                setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }


        };

        loadBooks();
    }, [pageSize, pageNum, selectedCategories]);

    const sortBooks = () => {
        const sorted = [...books].sort((a, b) =>
            sortAscending
                ? a.title.localeCompare(b.title)
                : b.title.localeCompare(a.title)
        );
        setSortedBooks(sorted);
        setSortAscending(!sortAscending);
    };

    useEffect(() => {
        setSortedBooks(books);
    }, [books]);

    if (loading) return <p>Loading Books...</p>
    if (error) return <p className="text-red-500">Error: {error}</p>

    return (
        <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <button onClick={sortBooks} className="btn btn-outline-secondary">
                    Sort by Title {sortAscending ? "▲" : "▼"}
                </button>
                <div>
                    <label className="me-2">Results per page:</label>
                    <select 
                        value={pageSize} 
                        onChange={(p) => {
                            setPageSize(Number(p.target.value));
                            setPageNum(1);
                        }}
                        className="form-select d-inline w-auto"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                    </select>
                </div>
            </div>

            {sortedBooks.map((b) => (
                <div id="bookCard" className="card mb-4 shadow-sm" key={b.bookID}>
                    <div className="card-body">
                        <h4 className="card-title text-primary">{b.title}</h4>
                        <ul className="list-unstyled mb-3">
                            <li><strong>Author:</strong> {b.author}</li>
                            <li><strong>Publisher:</strong> {b.publisher}</li>
                            <li><strong>ISBN:</strong> {b.isbn}</li>
                            <li><strong>Classification:</strong> {b.classification}</li>
                            <li><strong>Category:</strong> {b.category}</li>
                            <li><strong>Page Count:</strong> {b.pageCount}</li>
                            <li><strong>Price:</strong> ${b.price}</li>
                        </ul>
                        <button className="btn btn-success" onClick={() => navigate(`/checkout/${b.title}/${b.bookID}/${b.price}`)}>
                            📚 Purchase
                        </button>
                    </div>
                </div>
            ))}

            <div className="d-flex justify-content-center flex-wrap gap-2 mt-4">
                <button className="btn btn-outline-primary" disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>Previous</button>

                {[...Array(totalPages)].map((_, i) => (
                    <button key={i+1} className={`btn ${pageNum === (i + 1) ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setPageNum(i + 1)}>
                        {i + 1}
                    </button>
                ))}

                <button className="btn btn-outline-primary" disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button>
            </div>
        </div>
    );
}

export default BookList;
