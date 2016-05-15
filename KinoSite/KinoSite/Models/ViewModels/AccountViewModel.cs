using System.ComponentModel.DataAnnotations;

namespace KinoSite.Models.ViewModels
{
    public class AccountViewModel
    {
        [Required(ErrorMessage = "Введите e-mail")]
        [DataType(DataType.EmailAddress, ErrorMessage = "Введите корректный e-mail")]
        [MinLength(6, ErrorMessage = "Значение слишком короткое. Должно быть равно 6 символам или больше.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Введите пароль")]
        [DataType(DataType.Password)]
        [MinLength(6, ErrorMessage = "Значение слишком короткое. Должно быть равно 6 символам или больше.")]
        public string Password { get; set; }
    }
}