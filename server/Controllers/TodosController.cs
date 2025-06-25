using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TodosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TodosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/todos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoDto>>> GetTodos()
        {
            var userId = GetCurrentUserId();
            
            var todos = await _context.TodoItems
                .Where(t => t.UserId == userId)
                .Select(t => new TodoDto
                {
                    Id = t.Id,
                    Text = t.Text,
                    Completed = t.Completed,
                    CreatedAt = t.CreatedAt
                })
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();

            return Ok(todos);
        }

        // GET: api/todos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoDto>> GetTodo(int id)
        {
            var userId = GetCurrentUserId();
            
            var todo = await _context.TodoItems
                .Where(t => t.Id == id && t.UserId == userId)
                .Select(t => new TodoDto
                {
                    Id = t.Id,
                    Text = t.Text,
                    Completed = t.Completed,
                    CreatedAt = t.CreatedAt
                })
                .FirstOrDefaultAsync();

            if (todo == null)
            {
                return NotFound();
            }

            return Ok(todo);
        }

        // POST: api/todos
        [HttpPost]
        public async Task<ActionResult<TodoDto>> CreateTodo(CreateTodoDto createTodoDto)
        {
            var userId = GetCurrentUserId();

            var todo = new TodoItem
            {
                Text = createTodoDto.Text,
                Completed = false,
                UserId = userId,
                CreatedAt = DateTime.UtcNow
            };

            _context.TodoItems.Add(todo);
            await _context.SaveChangesAsync();

            var todoDto = new TodoDto
            {
                Id = todo.Id,
                Text = todo.Text,
                Completed = todo.Completed,
                CreatedAt = todo.CreatedAt
            };

            return CreatedAtAction(nameof(GetTodo), new { id = todo.Id }, todoDto);
        }

        // PUT: api/todos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(int id, UpdateTodoDto updateTodoDto)
        {
            var userId = GetCurrentUserId();
            
            var todo = await _context.TodoItems
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (todo == null)
            {
                return NotFound();
            }

            todo.Text = updateTodoDto.Text;
            todo.Completed = updateTodoDto.Completed;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoExists(id, userId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // PATCH: api/todos/5/toggle
        [HttpPatch("{id}/toggle")]
        public async Task<ActionResult<TodoDto>> ToggleTodo(int id)
        {
            var userId = GetCurrentUserId();
            
            var todo = await _context.TodoItems
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (todo == null)
            {
                return NotFound();
            }

            todo.Completed = !todo.Completed;
            await _context.SaveChangesAsync();

            var todoDto = new TodoDto
            {
                Id = todo.Id,
                Text = todo.Text,
                Completed = todo.Completed,
                CreatedAt = todo.CreatedAt
            };

            return Ok(todoDto);
        }

        // DELETE: api/todos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            var userId = GetCurrentUserId();
            
            var todo = await _context.TodoItems
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (todo == null)
            {
                return NotFound();
            }

            _context.TodoItems.Remove(todo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/todos/completed
        [HttpDelete("completed")]
        public async Task<IActionResult> DeleteCompletedTodos()
        {
            var userId = GetCurrentUserId();
            
            var completedTodos = await _context.TodoItems
                .Where(t => t.UserId == userId && t.Completed)
                .ToListAsync();

            _context.TodoItems.RemoveRange(completedTodos);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/todos/stats
        [HttpGet("stats")]
        public async Task<ActionResult<TodoStatsDto>> GetTodoStats()
        {
            var userId = GetCurrentUserId();
            
            var todos = await _context.TodoItems
                .Where(t => t.UserId == userId)
                .ToListAsync();

            var stats = new TodoStatsDto
            {
                Total = todos.Count,
                Completed = todos.Count(t => t.Completed),
                Pending = todos.Count(t => !t.Completed)
            };

            return Ok(stats);
        }

        private int GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            {
                throw new UnauthorizedAccessException("Invalid user token");
            }
            return userId;
        }

        private bool TodoExists(int id, int userId)
        {
            return _context.TodoItems.Any(e => e.Id == id && e.UserId == userId);
        }
    }

    // DTOs for Todos controller
    public class TodoDto
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public bool Completed { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CreateTodoDto
    {
        public string Text { get; set; } = string.Empty;
    }

    public class UpdateTodoDto
    {
        public string Text { get; set; } = string.Empty;
        public bool Completed { get; set; }
    }

    public class TodoStatsDto
    {
        public int Total { get; set; }
        public int Completed { get; set; }
        public int Pending { get; set; }
    }
} 