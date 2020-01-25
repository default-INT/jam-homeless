using Homeless.Application;
using Homeless.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Homeless.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ProfileController : ControllerBase
    {
        private readonly HomelessContext _context;

        public ProfileController(HomelessContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ViewAdvert>>> GetAdverts()
        {
            return null;
        }
    }
}
