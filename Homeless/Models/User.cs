using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Homeless.Models
{
    public class User : IdentityUser
    {
        public string FullName { get; set; }
        public string ImageUrl { get; set; }

        public virtual IEnumerable<Advert> Adverts { get; set; }
    }
}
