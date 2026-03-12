using Phonebook.Backend.DataAccess.Entities;

namespace Phonebook.Backend.Business.Interfaces
{
    public interface IPhoneTypeService
    {
        Task<IEnumerable<PhoneType>> GetAllPhoneTypesAsync();
    }
}