using Microsoft.EntityFrameworkCore;
using Phonebook.Backend.Business.Interfaces;
using Phonebook.Backend.DataAccess.Context;
using Phonebook.Backend.DataAccess.Entities;

namespace Phonebook.Backend.Business.Services
{
    public class PhoneTypeService : IPhoneTypeService
    {
        private readonly ApplicationDbContext _context;

        public PhoneTypeService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PhoneType>> GetAllPhoneTypesAsync()
        {
            return await _context.PhoneTypes.ToListAsync();
        }
    }
}