using KinoSite.Models.EntityModels;
using System;
using System.Web.Security;

namespace KinoSite.Services.AccountService
{
    public class LoginService : ILogin
    {
        public Session Login(string email, string password, User user)
        {
            if (user != null)
            {
                if (user.Password == password)
                {
                    FormsAuthentication.SetAuthCookie(email, false);

                    return new Session()
                    {
                        SessionID = Guid.NewGuid(),
                        User = user,
                        CreatedDate = DateTime.Now
                    };
                }
                else
                {
                    throw new Exception("Password is not correct!");
                }
            }
            else
            {
                throw new Exception("Email is not correct!");
            }
        }
    }
}