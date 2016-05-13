using KinoSite.Models.EntityModels;
using System.Collections.Generic;

namespace KinoSite.Services.AccountService
{
    public interface IRegister
    {
        User Register(string email, string password, List<User> users);
    }
}