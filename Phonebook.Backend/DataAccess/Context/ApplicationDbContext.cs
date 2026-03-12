using System.Collections.Generic;
using System.Reflection.Emit;
using Microsoft.EntityFrameworkCore;
using Phonebook.Backend.DataAccess.Entities;

namespace Phonebook.Backend.DataAccess.Context
{
    public class ApplicationDbContext : DbContext
    {
        // Konstruktor
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Tablice u SQL-u
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<PhoneNumber> PhoneNumbers { get; set; }
        public DbSet<PhoneType> PhoneTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Početni podatci
            modelBuilder.Entity<PhoneType>().HasData(
                new PhoneType { Id = 1, Name = "Mobile" },
                new PhoneType { Id = 2, Name = "Home" },
                new PhoneType { Id = 3, Name = "Work" }
            );
        }
    }
}