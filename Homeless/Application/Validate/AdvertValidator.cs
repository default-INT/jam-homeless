using Homeless.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Homeless.Application.Validate
{
    public class AdvertValidator : IValidator<Advert>
    {
        public bool IsValid(Advert obj)
        {
            bool valid = true;

            return valid;
        }
    }
}
