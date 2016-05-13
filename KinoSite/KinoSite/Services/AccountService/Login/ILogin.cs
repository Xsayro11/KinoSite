using KinoSite.Models.EntityModels;

namespace KinoSite.Services.AccountService
{
    public interface ILogin
    {
        Session Login(User user, string password);
    }
}