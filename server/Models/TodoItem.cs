using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class TodoItem
    {
        public int Id { get; set; }
        [Required]
        public string Text { get; set; }
        [Required]
        public bool Completed { get; set; }

        public int UserId { get; set; }
        [Required]
        [ForeignKey("UserId")]
        public User User { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
