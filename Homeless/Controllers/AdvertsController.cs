using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Homeless.Application;
using Homeless.Models;
using Homeless.Models.ViewModels;

namespace Homeless.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdvertsController : ControllerBase
    {
        private readonly HomelessContext _context;

        public AdvertsController(HomelessContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ViewAdvert>>> GetAdverts()
        {
            return await _context.Adverts.Select(advert => CreateViewAdvert(advert)).ToListAsync();
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
            if (id != advertView.Id)
            {
                return BadRequest();
            }

            var advert = await _context.Adverts.FindAsync(id);

            advert.Title = advertView.Title;
            advert.Information = advertView.Information;
            advert.ImageUrls = advertView.ImageUrls;
            advert.AnimalType = advertView.AnimalType;

            _context.Entry(advert).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdvertExists(id))
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
            _context.Adverts.Add(new Advert
            {
                ImageUrls = advert.ImageUrls,
                Information = advert.Information,
                Title = advert.Title,
                AnimalType = advert.AnimalType
            });

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAdvert", new { id = advert.Id }, advert);
        }

        // DELETE: api/Adverts/5
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

        private bool AdvertExists(int id)
        {
            return _context.Adverts.Any(e => e.Id == id);
        }

        private static ViewAdvert CreateViewAdvert(Advert advert)
        {
            return new ViewAdvert
            {
                Id = advert.Id,
                ImageUrls = advert.ImageUrls,
                Information = advert.Information,
                Title = advert.Title,
                AnimalType = advert.AnimalType
            };
        }
    }
}
