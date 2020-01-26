using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Homeless.Application;
using Homeless.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Homeless.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly HomelessContext _context;

        public ChatController(HomelessContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> PostMessage(Message message)
        {
            Message messageToAdd = new Message
            {
                MessageTime = message.MessageTime,
                Text = message.Text,
                UserId = User.FindFirstValue(ClaimTypes.NameIdentifier),
                User2Id = message.User2Id,
            };

            _context.Messages.Add(messageToAdd);
            await _context.SaveChangesAsync();

            message.Id = messageToAdd.Id;
            return CreatedAtAction("AddMessage", new { id = message.Id }, message);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Message>>> Messages(int user2Id)
        {
            string id = User.FindFirstValue(ClaimTypes.NameIdentifier);

            return await _context.Messages
                .Where(a => a.UserId.Equals(id) && (a.User2Id == user2Id.ToString())) // тут .tostring смущает
                .ToListAsync();
        }
    }
}