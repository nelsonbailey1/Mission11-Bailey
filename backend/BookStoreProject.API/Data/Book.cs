using System.ComponentModel.DataAnnotations;

namespace BookStoreProject.API.Data;

public class Book
{
    [Key]
    public int BookID { get; set; }
    [Required]
    public string Title { get; set; }
    public string Author { get; set; }
    public string Publisher { get; set; }
    public string ISBN { get; set; }
    public string Classification { get; set; }
    public string Category { get; set; }
    public int PageCount { get; set; }
    public string Price { get; set; }
}