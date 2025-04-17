using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookStoreProject.API.Data;

namespace BookStoreProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntertainersController : ControllerBase
    {
        private readonly EntertainmentAgencyDbContext _context;

        public EntertainersController(EntertainmentAgencyDbContext context)
        {
            _context = context;
        }

        [HttpGet("summary")]
        public async Task<ActionResult<IEnumerable<EntertainerSummaryDto>>> GetEntertainerSummaries()
        {
            var entertainers = await _context.Entertainers.ToListAsync();
            var engagements = await _context.Engagements.ToListAsync();

            var summaries = entertainers.Select(e => new EntertainerSummaryDto
            {
                EntertainerID = e.EntertainerID,
                EntStageName = e.EntStageName,
                BookingCount = engagements.Count(en => en.EntertainerID == e.EntertainerID),
                LastBookingDate = engagements
                    .Where(en => en.EntertainerID == e.EntertainerID)
                    .OrderByDescending(en => en.StartDate)
                    .Select(en => en.StartDate)
                    .FirstOrDefault()
            }).ToList();

            return summaries;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Entertainer>>> GetEntertainers()
        {
            return await _context.Entertainers.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Entertainer>> GetEntertainer(int id)
        {
            var entertainer = await _context.Entertainers.FindAsync(id);
            if (entertainer == null)
            {
                return NotFound();
            }
            return entertainer;
        }

        [HttpPost]
        public async Task<ActionResult<Entertainer>> PostEntertainer(Entertainer entertainer)
        {
            _context.Entertainers.Add(entertainer);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEntertainer), new { id = entertainer.EntertainerID }, entertainer);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEntertainer(int id, Entertainer entertainer)
        {
            if (id != entertainer.EntertainerID)
            {
                return BadRequest();
            }

            _context.Entry(entertainer).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Entertainers.Any(e => e.EntertainerID == id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEntertainer(int id)
        {
            var entertainer = await _context.Entertainers.FindAsync(id);
            if (entertainer == null)
            {
                return NotFound();
            }

            _context.Entertainers.Remove(entertainer);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}