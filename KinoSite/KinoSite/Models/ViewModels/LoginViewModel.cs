using System.ComponentModel.DataAnnotations;

namespace KinoSite.Models.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Введите e-mail")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Введите пароль")]
        public string Password { get; set; }

        public bool Remember { get; set; }
    }
}