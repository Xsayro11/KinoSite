using KinoSite.Models.EntityModels;
using KinoSite.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Web.Security;

namespace KinoSite.BL.AccountManagment
{
    public class AccountManager
    {
        public User Register(string email, string password, List<User> users)
        {
            if (users != null)
            {
                foreach (var user in users)
                {
                    if (user.Email == email)
                    {
                        throw new Exception("User with this email already exist!");
                    }
                }
            }

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

        public void Logout()
        {
            FormsAuthentication.SignOut();
        }

        public void Validate(AccountViewModel user)
        {
            if (user == null)
            {
                throw new Exception("User model is empty!");
            }

            if (string.IsNullOrEmpty(user.Email)
            || string.IsNullOrEmpty(user.Password))
            {
                throw new Exception("Email or password is empty!");
            }
        }
    }
}