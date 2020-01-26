using Homeless.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Homeless.Application.Validate
{
    public class UserValidator : IValidator<User>
    {
        public bool IsValid(User obj)
        {
            bool valid = true;

            return valid;
        }
    }
}
