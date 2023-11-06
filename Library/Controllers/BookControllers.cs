
using Microsoft.AspNetCore.Mvc;
using Library.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Library.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private static readonly List<Book> Books = new List<Book>();

        // GET: api/books
        [HttpGet]
        public IActionResult Get([FromQuery] string? search, [FromQuery] string sort, [FromQuery] int? pageNumber, [FromQuery] int? pageSize)
        {
            var query = Books.AsQueryable();

            // Search filtering
            if (!string.IsNullOrWhiteSpace(search)) // This will also check for strings that are just whitespace
            {
                query = query.Where(b => 
                    (b.Title != null && b.Title.Contains(search)) ||
                    (b.Author != null && b.Author.Contains(search)) ||
                    (b.Publisher != null && b.Publisher.Contains(search)));
            }
            
            // Sorting
            switch (sort)
            {
                case "title":
                    query = query.OrderBy(b => b.Title);
                    break;
                case "title_desc":
                    query = query.OrderByDescending(b => b.Title);
                    break;
                case "author":
                    query = query.OrderBy(b => b.Author);
                    break;
                case "author_desc":
                    query = query.OrderByDescending(b => b.Author);
                    break;
                case "publisher":
                    query = query.OrderBy(b => b.Publisher);
                    break;
                case "publisher_desc":
                    query = query.OrderByDescending(b => b.Publisher);
                    break;
                case "publishedDate":
                    query = query.OrderBy(b => b.PublishedDate);
                    break;
                case "publishedDate_desc":
                    query = query.OrderByDescending(b => b.PublishedDate);
                    break;
            }

            // Pagination
            pageNumber = pageNumber ?? 1;
            pageSize = pageSize ?? 5;
            var paginatedQuery = query.Skip((pageNumber.Value - 1) * pageSize.Value).Take(pageSize.Value);

            return Ok(paginatedQuery.ToList());
        }

        // Specific Book search
        // GET: api/books/5
        [HttpGet("{id}")]
        public ActionResult GetBook(int id)
        {
            var book = Books.FirstOrDefault(b => b.Id == id);
            if (book == null)
            {
                return NotFound(new { Message = $"Book with ID {id} not found." });
            }
            return Ok(new { Message = "Book found.", BookDetails = book });
        }

        // POST: api/books
        [HttpPost]
        public ActionResult PostBook(Book book)
        {
            if (book == null)
            {
                return BadRequest(new { Message = "Invalid book data. The book cannot be null." });
            }
            Books.Add(book);
            return CreatedAtAction(nameof(GetBook), new { id = book.Id }, new { Message = "Book created successfully.", BookDetails = book });
        }

        // PUT: api/books/5
        [HttpPut("{id}")]
        public IActionResult PutBook(int id, Book book)
        {
            if (book == null || id != book.Id)
            {
                return BadRequest(new { Message = "Book data is null or the ID does not match the resource URL." });
            }

            var index = Books.FindIndex(b => b.Id == id);
            if (index < 0)
            {
                return NotFound(new { Message = $"Book with ID {id} could not be found." });
            }

            Books[index] = book;
            return Ok(new { Message = $"Book with ID {id} was updated.", UpdatedBookDetails = book });
        }

        // DELETE: api/books/5
        [HttpDelete("{id}")]
        public IActionResult DeleteBook(int id)
        {
            var book = Books.FirstOrDefault(b => b.Id == id);
            if (book == null)
            {
                return NotFound(new { Message = $"Book with ID {id} could not be found." });
            }
            
            Books.Remove(book);
            return Ok(new { Message = $"Book with ID {id} was deleted.", BookDetails = book });
        }
    }
}
