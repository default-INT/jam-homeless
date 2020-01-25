using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Homeless.Models
{
    public class Banned
    {
        public int Id { get; set; }
        public int AdvertId { get; set; }
        public int UserId { get; set; }

        public virtual Advert BannedAdvert { get; set; }
        public virtual User ForUser { get; set; }
    }
}
