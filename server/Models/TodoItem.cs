using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class TodoItem
    {
        public int Id { get; set; }
        [Required]
        public string Text { get; set; } = string.Empty;
        [Required]
        public bool Completed { get; set; }

        public string UserId { get; set; } = string.Empty;
        [Required]
        [ForeignKey("UserId")]
        public User User { get; set; } = null!;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
