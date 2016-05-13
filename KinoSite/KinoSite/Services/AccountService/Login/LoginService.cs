using KinoSite.Models.EntityModels;
using System;
using System.Web.Security;

namespace KinoSite.Services.AccountService
{
    public class LoginService : ILogin
    {
        public Session Login(User user, string password)
        {
            if (user != null)
            {
                if (user.Password == password)
                {
                    FormsAuthentication.SetAuthCookie(user.Email, false);

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