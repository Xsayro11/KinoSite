using KinoSite.Logging;
using KinoSite.Models.EntityModels;
using KinoSite.Services.UnitOfWorkService;
using KinoSite.Services.UserService;
using System;
using System.Collections.Generic;

namespace KinoSite.Services.AccountService
{
    public class RegisterService : IRegister
    {
        private IUnitOfWork _unitOfWork;
        private IUserService _userService;
        private ILogger _log;

        public RegisterService(IUnitOfWork unitOfWork, IUserService userService, ILogger log)
        {
            this._unitOfWork = unitOfWork;
            this._userService = userService;
            this._log = log;
        }

        public User Register(string email, string password, List<User> users)
        {
            if(string.IsNullOrEmpty(email)
                || string.IsNullOrEmpty(password))
            {
                throw new Exception("Email or password is empty!");
            }

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
    }
}