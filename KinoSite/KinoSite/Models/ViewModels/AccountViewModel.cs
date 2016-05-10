using System.ComponentModel.DataAnnotations;

namespace KinoSite.Models.ViewModels
{
    public class AccountViewModel
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public bool Remember { get; set; }
    }
}