using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Phonebook.Backend.DataAccess.Entities
{
    public class PhoneNumber
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(20)]
        public string Number { get; set; }

        //Glavni broj
        public bool IsDefault { get; set; }

        public int ContactId { get; set; }
        public int PhoneTypeId { get; set; }

        [ForeignKey("ContactId")]
        [JsonIgnore]
        public virtual Contact? Contact { get; set; }

        [ForeignKey("PhoneTypeId")]
        public virtual PhoneType? PhoneType { get; set; }
    }
}