using KinoSite.BL.AccountManagment;
using KinoSite.BL.SessionManagment;
using KinoSite.Logging;
using KinoSite.Models.EntityModels;
using KinoSite.Services.UnitOfWorkService;
using System;

namespace KinoSite.Services.AccountService
{
    public class Account : IAccount
    {
        private IUnitOfWork _unitOfWork;
        private IAccountManager _accountManager;
        private ISessionManager _sessionManager;
        private ILogger _log;
        private User _currentUser;

        public Account(IUnitOfWork unitOfWork, IAccountManager accountManager, ISessionManager sessionManager, ILogger log)
        {
            _unitOfWork = unitOfWork;
            _accountManager = accountManager;
            _sessionManager = sessionManager;
            _log = log;
        }

        public User CurrentUser
        {
            get
            {
                if (_currentUser != null)
                {
                    return _currentUser;
                }
                else
                {
                    var sessionID = _sessionManager.GetCurrentSessionID();

                    if (sessionID != Guid.Empty)
                    {
                        var session = _unitOfWork.SessionRepository.GetByID(sessionID);
                        return session.User;
                    }
                    else
                    {
                        return new EmptyUser();
                    }
                }
            }
        }

        public void Register(string email, string password)
        {
            try
            {
                var registeredUser = _accountManager.Register(email, password);
                _unitOfWork.UserRepository.Add(registeredUser);
                _currentUser = registeredUser;
            }
            catch (Exception ex)
            {
                _log.Write(ex.Message, EventSeverity.Error);
            }
        }

        public bool Login(string email, string password)
        {
            try
            {
                var loggedUser = _unitOfWork.UserRepository.GetUserByEmail(email);

                if (loggedUser is EmptyUser)
                {
                    return false;
                }

                var session = _accountManager.Login(loggedUser, password);

                if (session is EmptySession)
                {
                    return false;
                }

                _unitOfWork.SessionRepository.Add(session);
                return true;
            }
            catch (Exception ex)
            {
                _log.Write(ex.Message, EventSeverity.Error);
                return false;
            }
        }

        public void Login()
        {
            try
            {
                var session = _accountManager.Login(_currentUser, _currentUser.Password);
                _unitOfWork.SessionRepository.Add(session);
            }
            catch (Exception ex)
            {
                _log.Write(ex.Message, EventSeverity.Error);
            }
        }

        public void Logout()
        {
            _accountManager.Logout();
        }

        public bool UserExists(string email)
        {
            var user = _unitOfWork.UserRepository.GetUserByEmail(email);

            if (user is EmptyUser)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
    }
}