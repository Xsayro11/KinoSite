using KinoSite.Models.EntityModels;

namespace KinoSite.BL.AccountManagment
{
    public interface IAccountManager
    {
        User Register(string email, string password);
        Session Login(User user, string password);
        void Logout();
    }
}
