using KinoSite.Models.EntityModels;

namespace KinoSite.Services.UserService
{
    public interface IUserService
    {
        User AddUser(User model);
        User EditUser(User model, int userId);
        void DeleteUser(int? userId);
    }
}