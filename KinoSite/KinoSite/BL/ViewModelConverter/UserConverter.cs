using KinoSite.Models.EntityModels;
using KinoSite.Models.ViewModels;

namespace KinoSite.BL.ViewModelConverter
{
    public class UserConverter : IConverter<AccountViewModel, User>
    {
        public User Convert(AccountViewModel viewModel)
        {
            return new User()
            {
                Email = viewModel.Email,
                Password = viewModel.Password
            };
        }
    }
}