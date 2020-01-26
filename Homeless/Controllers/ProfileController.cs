using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Homeless.Application;
using Homeless.Models;
using Homeless.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Homeless.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {

        private readonly HomelessContext _context;

        public ProfileController(HomelessContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> GiveLike(int advertId)
        {
            if (advertId <= 0 && !AdvertsController.AdvertExists(advertId, _context))
            {
                return BadRequest();
            }

            Like like = new Like
            {
                AdvertId = advertId,
                UserId = User.FindFirstValue(ClaimTypes.NameIdentifier)
            };

            _context.Likes.Add(like);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> GiveBanned(int advertId)
        {
            if (advertId <= 0 && !_context.Banneds.Any(b => b.Id == advertId))
            {
                return BadRequest();
            }

            Banned banned = new Banned
            {
                AdvertId = advertId,
                UserId = User.FindFirstValue(ClaimTypes.NameIdentifier)
            };

            _context.Banneds.Add(banned);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ViewAdvert>>> Adverts()
        {
            string id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return await _context.Adverts
                .Where(a => a.UserId.Equals(id))
                .Select(advert => AdvertsController.CreateViewAdvert(advert))
                .ToListAsync();
        }
    }
}