using KinoSite.Models.EntityModels;

namespace KinoSite.Services.AccountService
{
    public interface IAccount
    {
        User CurrentUser { get; }
        void Register(string email, string password);
        bool Login(string email, string password);
        void Login();
        void Logout();
        bool UserExists(string email);
    }
}