using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Homeless.Application;
using Homeless.Models;
using Homeless.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
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
        private readonly UserManager<User> _userManager;

        public ProfileController(HomelessContext context, UserManager<User> manager)
        {
            _context = context;
            _userManager = manager;
        }

        [HttpPost("{advertId}")]
        public async Task<IActionResult> Like(int advertId)
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

        [HttpPost("{advertId}")]
        public async Task<IActionResult> Banned(int advertId)
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

        [HttpGet]
        public async Task<ActionResult<string>> Avatar()
        {
            return (await _userManager.GetUserAsync(User)).ImageUrl;
        }

        [HttpPost]
        public async Task<ActionResult<string>> Avatar(ImageBase64 base64)
        {
            User user = await _userManager.GetUserAsync(User);
            user.ImageUrl = AdvertsController.ImagesToUrl(new string[] { base64.Url }, User);
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return "{\"url\":\"" + user.ImageUrl + "\"}";
        }

        [HttpGet("{advertId}")]
        public async Task<ActionResult<IEnumerable<ViewUser>>> WhoLikePost(int advertId)
        {
            return await _context.Likes
                .Where(l => l.AdvertId == advertId)
                .Include(l => l.LikeFromUser)
                .Select(u => new ViewUser
                {
                    FullName = u.LikeFromUser.FullName,
                    ImageUrl = u.LikeFromUser.ImageUrl,
                    Id = u.UserId
                }).ToListAsync();
        }

        public class ImageBase64
        {
            public string Url { get; set; }
        }
    }
}