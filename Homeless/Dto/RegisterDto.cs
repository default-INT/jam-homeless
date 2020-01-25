using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Homeless.Dto
{
    public class RegisterDto
    {
        [Required]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Password min length is 6", MinimumLength = 6)]
        public string Password { get; set; }

        public string FullName { get; set; }
    }
}
