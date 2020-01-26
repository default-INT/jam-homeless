﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;

namespace Homeless.Application
{
    public class HomelessContext : IdentityDbContext
    {
        public HomelessContext(DbContextOptions<HomelessContext> options) : base(options)
        {

        }

        public virtual DbSet<Models.Advert> Adverts { get; set; }
        public virtual DbSet<Models.Banned> Banneds { get; set; }
        public virtual DbSet<Models.Like> Likes { get; set; }
    }
}
