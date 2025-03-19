using BookStoreProject.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookStoreDbContext _context;
        
        public BookController(BookStoreDbContext context) => _context = context;

        public IActionResult GetBooks(int pageSize, int pageNum = 1)
        {
            var dbBooks = _context.Books
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            
            var totalBooks = _context.Books.Count();

            var library = new
            {
                Books = dbBooks,
                TotalBooks = totalBooks
            };
            
            return Ok(library);
        }
    }
}
