using KinoSite.BL.AccountManagment;
using KinoSite.Logging;
using KinoSite.Models.ViewModels;
using KinoSite.Services.UnitOfWorkService;
using System;

namespace KinoSite.Services.AccountService
{
    public class Account : IAccount
    {
        private IUnitOfWork _unitOfWork;
        private IAccountManager _accountManager;
        private ILogger _log;

        public Account(IUnitOfWork unitOfWork, IAccountManager accountManager, ILogger log)
        {
            _unitOfWork = unitOfWork;
            _accountManager = accountManager;
            _log = log;
        }

        public void Register(AccountViewModel user)
        {
            try
            {
                var users = _unitOfWork.UserRepository.GetAll();
                var registeredUser = _accountManager.Register(user.Email, user.Password, users);
                _unitOfWork.UserRepository.Add(registeredUser);
                _unitOfWork.SaveChanges();
            }
            catch (Exception ex)
            {
                _log.Write(ex.Message, EventSeverity.Error);
            }
        }

        public bool Login(AccountViewModel user)
        {
            try
            {
                var loggedUser = _unitOfWork.UserRepository.GetUserByEmail(user.Email);
                var session = _accountManager.Login(loggedUser, user.Password);
                _unitOfWork.SessionRepository.Add(session);
                _unitOfWork.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                _log.Write(ex.Message, EventSeverity.Error);
                return false;
            }
        }

        public void Logout()
        {
            _accountManager.Logout();
        }

        public bool IsValid(AccountViewModel user)
        {
            try
            {
                _accountManager.Validate(user);
                return true;
            }
            catch(Exception ex)
            {
                _log.Write(ex.Message, EventSeverity.Error);
                return false;
            }
        }
    }
}