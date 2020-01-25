using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Homeless.Models.ViewModels
{
    public class ViewAdvert
    {
        public int Id { get; set; }

        public string Title { get; set; }
        public string ImageUrls { get; set; } // split by ';'
        public string Information { get; set; }
        public AnimalType AnimalType { get; set; }
    }
}
