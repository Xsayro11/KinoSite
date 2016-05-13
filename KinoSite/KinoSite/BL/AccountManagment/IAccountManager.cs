using KinoSite.Models.EntityModels;
using KinoSite.Models.ViewModels;
using System.Collections.Generic;

namespace KinoSite.BL.AccountManagment
{
    public interface IAccountManager
    {
        User Register(string email, string password, List<User> users);
        Session Login(User user, string password);
        void Logout();
        void Validate(AccountViewModel user);
    }
}
