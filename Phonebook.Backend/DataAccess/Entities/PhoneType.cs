using System.ComponentModel.DataAnnotations;

namespace Phonebook.Backend.DataAccess.Entities
{
    public class PhoneType
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(20)]
        public string Name { get; set; }
    }
}