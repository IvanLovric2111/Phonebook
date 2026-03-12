using Microsoft.EntityFrameworkCore;
using Phonebook.Backend.Business.Interfaces;
using Phonebook.Backend.DataAccess.Context;
using Phonebook.Backend.DataAccess.Entities;

namespace Phonebook.Backend.Business.Services
{
    public class ContactService : IContactService
    {
        private readonly ApplicationDbContext _context;

        public ContactService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Contact>> GetAllContactsAsync()
        {
            return await _context.Contacts
                .Include(c => c.PhoneNumbers)
                .AsNoTracking()
                .OrderBy(c => c.LastName)
                    .ThenBy(c => c.FirstName)
                        .ThenBy(c => c.Id)
                .ToListAsync();
        }

        public async Task<Contact?> GetContactByIdAsync(int id)
        {
            return await _context.Contacts
                .Include(c => c.PhoneNumbers)
                    .ThenInclude(pn => pn.PhoneType)
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Contact> CreateContactAsync(Contact contact)
        {
            if (contact.PhoneNumbers.Any() && !contact.PhoneNumbers.Any(p => p.IsDefault))
            {
                contact.PhoneNumbers.First().IsDefault = true;
            }

            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();
            return contact;
        }

        public async Task<bool> UpdateContactAsync(Contact contact)
        {
            var existingContact = await _context.Contacts
                .Include(c => c.PhoneNumbers)
                .FirstOrDefaultAsync(c => c.Id == contact.Id);

            if (existingContact == null) return false;

            _context.Entry(existingContact).CurrentValues.SetValues(contact);

            _context.PhoneNumbers.RemoveRange(existingContact.PhoneNumbers);
            foreach (var pn in contact.PhoneNumbers)
            {
                existingContact.PhoneNumbers.Add(new PhoneNumber
                {
                    Number = pn.Number,
                    PhoneTypeId = pn.PhoneTypeId,
                    ContactId = contact.Id,
                    IsDefault = pn.IsDefault
                });
            }

            if (existingContact.PhoneNumbers.Any() && !existingContact.PhoneNumbers.Any(p => p.IsDefault))
            {
                existingContact.PhoneNumbers.First().IsDefault = true;
            }

            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception.Message);
                return false;
            }
        }

        public async Task<bool> DeleteContactAsync(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null) return false;

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}