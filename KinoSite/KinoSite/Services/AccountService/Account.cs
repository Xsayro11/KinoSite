using KinoSite.BL.ViewModelConverter;
using KinoSite.Logging;
using KinoSite.Models.EntityModels;
using KinoSite.Models.ViewModels;
using KinoSite.Services.UnitOfWorkService;
using System;

namespace KinoSite.Services.AccountService
{
    public class Account : IAccount
    {
        private IUnitOfWork _unitOfWork;
        private IConverter<AccountViewModel, User> _converter;
        private IRegister _registerService;
        private ILogin _loginService;
        private ILogout _logoutService;
        private ILogger _log;

        public Account(IUnitOfWork unitOfWork, IConverter<AccountViewModel, User> converter, IRegister registerService, ILogin loginService, ILogout logoutService, ILogger log)
        {
            _unitOfWork = unitOfWork;
            _converter = converter;
            _registerService = registerService;
            _loginService = loginService;
            _logoutService = logoutService;
            _log = log;
        }

        public void Register(AccountViewModel user)
        {
            this._registerService.Register(user.Email, user.Password);
        }

        public bool Login(AccountViewModel user)
        {
            using (_unitOfWork)
            {
                try
                {
                    var loggedUser = _unitOfWork.UserRepository.GetUserByEmail(user.Email);
                    var session = _loginService.Login(user.Email, user.Password, loggedUser);
                    _unitOfWork.SessionRepository.Add(session);
                    _unitOfWork.SaveChanges();
                }
                catch(Exception ex)
                {
                    _log.Write(ex.Message, EventSeverity.Error);
                    return false;
                }

                return true;
            }
        }

        public void Logout()
        {
            _logoutService.Logout();
        }

        public bool IsValid(AccountViewModel user)
        {
            if (user == null)
                return false;

            if (string.IsNullOrEmpty(user.Email))
                return false;
            if (string.IsNullOrEmpty(user.Password))
                return false;

            return true;
        }
    }
}