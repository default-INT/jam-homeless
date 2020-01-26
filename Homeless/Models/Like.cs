using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Homeless.Models
{
    public class Like
    {
        public int Id { get; set; }
        public int AdvertId { get; set; }
        public string UserId { get; set; }

        public virtual User LikeFromUser { get; set; }
        public virtual Advert LikedAdvert { get; set; }
    }
}
