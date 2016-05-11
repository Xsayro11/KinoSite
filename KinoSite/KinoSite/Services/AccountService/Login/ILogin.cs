using KinoSite.Models.EntityModels;

namespace KinoSite.Services.AccountService
{
    public interface ILogin
    {
        Session Login(string email, string password, User user);
    }
}