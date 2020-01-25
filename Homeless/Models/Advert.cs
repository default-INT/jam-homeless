using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Homeless.Models
{
    public class Advert
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ImageUrls { get; set; }
        public string Information { get; set; }
        public int UserId { get; set; }
        public AnimalType AnimalType { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual User User { get; set; }
        public virtual IEnumerable<Like> Likes { get; set; }
    }
}
