using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Homeless.Application.Validate
{
    public interface IValidator<T>
    {
        public bool IsValid(T obj);
    }
}
