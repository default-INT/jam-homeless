using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Homeless.Models
{
    public class Message
    {
        public int Id { get; set; }

        public DateTime MessageTime { get; set; }
        public string Text { get; set; }

        public string UserId { get; set; }
        public string User2Id { get; set; }

        public virtual User User { get; set; }
        public virtual User User2 { get; set; }
    }
}
