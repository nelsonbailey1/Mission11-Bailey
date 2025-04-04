using System.Net;
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

        public IActionResult GetBooks(int pageSize, int pageNum = 1, [FromQuery] List<string>? Categories = null)
        {
            string? favoriteAuthor = Request.Cookies["FavoriteAuthor"];
            Console.WriteLine("\n—-—-—-—-—-COOKIE—-—-—-—-—-\n" + favoriteAuthor + "\n—-—-—-—-—-COOKIE—-—-—-—-—-\n");
            
            HttpContext.Response.Cookies.Append("FavoriteAuthor", "Victor", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.Now.AddMinutes(15)
            });
            
            var query = _context.Books.AsQueryable();

            if (Categories != null && Categories.Any())
            {
                query = query.Where(p => Categories.Contains(p.Category));
            }
            
            var totalBooks = query.Count();
            
            var dbBooks = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            

            var library = new
            {
                Books = dbBooks,
                TotalBooks = totalBooks
            };
            
            return Ok(library);
        }
        
        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories()
        {
            var bookCategories = _context.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();
            
            return Ok(bookCategories);

        }
    }
}
