namespace Library.Models
{
    public class Book
    {
        public int Id { get; set; }
        
        // Properties declared as nullable
        public string? Title { get; set; }
        public string? Author { get; set; }
        public string? Publisher { get; set; }
        public DateTime PublishedDate { get; set; }
        public string? Blurb { get; set; }
        public int? NumberOfPages { get; set; }
        public Book()
        {
            Title = "";
            Author = "";
            Publisher = "";
            Blurb = "";
        }
    }
}

