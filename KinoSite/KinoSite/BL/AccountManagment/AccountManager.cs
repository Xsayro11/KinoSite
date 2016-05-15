using KinoSite.Models.EntityModels;
using System;
using System.Web;
using System.Web.Security;
using KinoSite.Models.ViewModels;

namespace KinoSite.BL.AccountManagment
{
    public class AccountManager : IAccountManager
    {
        public User Register(string email, string password)
        {
            return new User()
            {
                UsetID = Guid.NewGuid(),
                Email = email,
                Password = password,
                RegisterDate = DateTime.Now
            };
        }

        public Session Login(User user, string password)
        {
            if (user.Password == password)
            {
                FormsAuthentication.SetAuthCookie(user.Email, false);

                var session = new Session()
                {
                    SessionID = Guid.NewGuid(),
                    User = user,
                    CreatedDate = DateTime.Now
                };

                var sessionCookie = new HttpCookie("Session");
                sessionCookie.Values["SessionID"] = session.SessionID.ToString();
                HttpContext.Current.Response.Cookies.Add(sessionCookie);

                return session;
            }
            else
            {
                return new EmptySession();
            }
        }

        public void Logout()
        {
            HttpContext.Current.Response.Cookies.Remove("Session");
            FormsAuthentication.SignOut();
        }
    }
}