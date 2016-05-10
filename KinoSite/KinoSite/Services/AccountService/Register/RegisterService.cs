using KinoSite.Logging;
using KinoSite.Models.EntityModels;
using KinoSite.Services.UnitOfWorkService;
using KinoSite.Services.UserService;
using System;

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

        public void Register(string email, string password)
        {
            using (_unitOfWork)
            {
                try
                {
                    _userService.AddUser(new User()
                    {
                        UsetID = Guid.NewGuid(),
                        Email = email,
                        Password = password,
                        RegisterDate = DateTime.Now
                    });

                    _unitOfWork.SaveChanges();
                }
                catch (Exception ex)
                {
                    _log.Write("Error on user register!", ex, EventSeverity.Error);
                }
            }
        }
    }
}