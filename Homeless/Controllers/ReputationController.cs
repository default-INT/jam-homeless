using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Homeless.Application;
using Homeless.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Homeless.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ReputationController : ControllerBase
    {
        private readonly HomelessContext _context;

        public ReputationController(HomelessContext context)
        {
            _context = context;
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> AddReputation(int userId)
        {
            User userToUpd = _context.USERS.Find(userId);
            userToUpd.Reputation++;

            _context.USERS.Update(userToUpd);

            _context.SaveChanges();
            
            return Ok();
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> SubReputation(int userId)
        {
            User userToUpd = _context.USERS.Find(userId);
            userToUpd.Reputation--;

            _context.USERS.Update(userToUpd);

            _context.SaveChanges();

            return Ok();
        }
    }
}