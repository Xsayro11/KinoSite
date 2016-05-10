using KinoSite.Models.ViewModels;

namespace KinoSite.Services.AccountService
{
    public interface IAccount
    {
        void Register(AccountViewModel user);
        bool Login(AccountViewModel user);
        void Logout();
        bool IsValid(AccountViewModel user);
    }
}