using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Homeless.Application;
using Homeless.Models;
using Homeless.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Homeless.Application.Validate;
using System.Security.Claims;
using System.IO;
using static System.Net.Mime.MediaTypeNames;

namespace Homeless.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AdvertsController : ControllerBase
    {
        public const string IMG_PATH = "~/images/";
        public const string IMG_USER_PATH = "/user_image/";
        private const string IMG_NAME = "image$.jpeg";
        private readonly HomelessContext _context;
        private readonly IValidator<Advert> advertValidator;

        public AdvertsController(HomelessContext context)
        {
            _context = context;
            advertValidator = new AdvertValidator();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ViewAdvert>>> GetAdverts()
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var likes = _context.Likes.Where(like => like.UserId == userId);
            var dis = _context.Banneds.Where(ban => ban.UserId == userId);

            return await _context.Adverts
                .Where(advert => advert.UserId != userId)
                .Where(advert => !likes.Any(l => l.AdvertId == advert.Id) && !dis.Any(d => d.AdvertId == advert.Id))
                .Select(advert => CreateViewAdvert(advert))
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ViewAdvert>> GetAdvert(int id)
        {
            var advert = await _context.Adverts.FindAsync(id);

            if (advert == null)
            {
                return NotFound();
            }

            return CreateViewAdvert(advert);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdvert(int id, ViewAdvert advertView)
        {
            if (advertView == null || id != advertView.Id)
            {
                return BadRequest();
            }

            var advert = await _context.Adverts.FindAsync(id);

            advert.Title = advertView.Title;
            advert.Information = advertView.Information;
            advert.ImageUrls = string.Join(";", ImagesToUrl(advertView.ImageUrls));
            advert.AnimalType = advertView.AnimalType;

            if (!advertValidator.IsValid(advert)) return BadRequest();

            _context.Entry(advert).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdvertExists(id, _context))
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

        [HttpPost]
        public async Task<ActionResult<Advert>> PostAdvert(ViewAdvert advert)
        {
            Advert resultAdvert = new Advert
            {
                ImageUrls = ImagesToUrl(advert.ImageUrls),
                Information = advert.Information,
                Title = advert.Title,
                AnimalType = advert.AnimalType,
                UserId = User.FindFirstValue(ClaimTypes.NameIdentifier)
            };

            if (!advertValidator.IsValid(resultAdvert)) return BadRequest();

            _context.Adverts.Add(resultAdvert);

            await _context.SaveChangesAsync();
            advert.Id = resultAdvert.Id;
            advert.ImageUrls = resultAdvert.ImageUrls.Split(';');
            return CreatedAtAction("GetAdvert", new { id = resultAdvert.Id }, advert);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Advert>> DeleteAdvert(int id)
        {
            var advert = await _context.Adverts.FindAsync(id);
            if (advert == null)
            {
                return NotFound();
            }

            advert.IsDeleted = true;
            await _context.SaveChangesAsync();

            return advert;
        }

        public static bool AdvertExists(int id, HomelessContext context)
        {
            return context.Adverts.Any(e => e.Id == id);
        }

        public static ViewAdvert CreateViewAdvert(Advert advert)
        {
            return new ViewAdvert
            {
                Id = advert.Id,
                ImageUrls = advert.ImageUrls.Split(";"),
                Information = advert.Information,
                Title = advert.Title,
                AnimalType = advert.AnimalType
            };
        }

        public static string ImagesToUrl(string[] imagesBase64, ClaimsPrincipal user = null)
        {
            List<string> urls = new List<string>();
            IEnumerable<byte[]> images = imagesBase64.Select(url =>
            {
                if (url.Contains(";base64,"))
                {
                    return Convert.FromBase64String(url.Substring(url.IndexOf(',') + 1));
                }
                else
                {
                    urls.Add(url);
                    return null;
                }
            });

            foreach (byte[] img in images)
            {
                if (img != null)
                {
                    string url;
                    if (user != null)
                    {
                        url = IMG_USER_PATH + user.FindFirstValue(ClaimTypes.NameIdentifier) + ".jpeg";
                    }
                    else
                    {
                        url = IMG_PATH + IMG_NAME.Replace("$", Directory.GetFiles(IMG_PATH).Length.ToString());
                    }
                    using (var imageFile = new FileStream(url, FileMode.Create))
                    {
                        imageFile.Write(img, 0, img.Length);
                    }
                    urls.Add(url);
                }
            }

            return string.Join(";", urls);
        }
    }
}
