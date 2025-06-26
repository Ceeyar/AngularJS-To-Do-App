using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/admin/todos
        [HttpGet("todos")]
        public async Task<ActionResult<IEnumerable<AdminTodoDto>>> GetAllTodos()
        {
            var todos = await _context.TodoItems
                .Include(t => t.User)
                .Select(t => new AdminTodoDto
                {
                    Id = t.Id,
                    Text = t.Text,
                    Completed = t.Completed,
                    CreatedAt = t.CreatedAt,
                    UserId = t.UserId,
                    UserName = t.User.UserName!,
                    UserEmail = t.User.Email!,
                    UserFullName = $"{t.User.FirstName} {t.User.LastName}"
                })
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();

            return Ok(todos);
        }

        // GET: api/admin/todos/stats
        [HttpGet("todos/stats")]
        public async Task<ActionResult<AdminTodoStatsDto>> GetTodoStats()
        {
            var totalTodos = await _context.TodoItems.CountAsync();
            var completedTodos = await _context.TodoItems.CountAsync(t => t.Completed);
            var pendingTodos = totalTodos - completedTodos;
            var totalUsers = await _context.Users.CountAsync();
            var usersWithTodos = await _context.Users.CountAsync(u => u.TodoItems.Any());

            return Ok(new AdminTodoStatsDto
            {
                TotalTodos = totalTodos,
                CompletedTodos = completedTodos,
                PendingTodos = pendingTodos,
                TotalUsers = totalUsers,
                UsersWithTodos = usersWithTodos
            });
        }

        // DELETE: api/admin/todos/{id}
        [HttpDelete("todos/{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            var todo = await _context.TodoItems.FindAsync(id);
            if (todo == null)
            {
                return NotFound();
            }

            _context.TodoItems.Remove(todo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PATCH: api/admin/todos/{id}/toggle
        [HttpPatch("todos/{id}/toggle")]
        public async Task<ActionResult<AdminTodoDto>> ToggleTodo(int id)
        {
            var todo = await _context.TodoItems
                .Include(t => t.User)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (todo == null)
            {
                return NotFound();
            }

            todo.Completed = !todo.Completed;
            await _context.SaveChangesAsync();

            return Ok(new AdminTodoDto
            {
                Id = todo.Id,
                Text = todo.Text,
                Completed = todo.Completed,
                CreatedAt = todo.CreatedAt,
                UserId = todo.UserId,
                UserName = todo.User.UserName!,
                UserEmail = todo.User.Email!,
                UserFullName = $"{todo.User.FirstName} {todo.User.LastName}"
            });
        }

        // DELETE: api/admin/todos/completed
        [HttpDelete("todos/completed")]
        public async Task<IActionResult> DeleteAllCompletedTodos()
        {
            var completedTodos = await _context.TodoItems
                .Where(t => t.Completed)
                .ToListAsync();

            _context.TodoItems.RemoveRange(completedTodos);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

    public class AdminTodoDto
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public bool Completed { get; set; }
        public DateTime CreatedAt { get; set; }
        public string UserId { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string UserEmail { get; set; } = string.Empty;
        public string UserFullName { get; set; } = string.Empty;
    }

    public class AdminTodoStatsDto
    {
        public int TotalTodos { get; set; }
        public int CompletedTodos { get; set; }
        public int PendingTodos { get; set; }
        public int TotalUsers { get; set; }
        public int UsersWithTodos { get; set; }
    }
} 