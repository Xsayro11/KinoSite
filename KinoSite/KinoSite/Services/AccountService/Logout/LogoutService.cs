using KinoSite.Services.UnitOfWorkService;
using System.Web.Security;

namespace KinoSite.Services.AccountService
{
    public class LogoutService : ILogout
    {
        private IUnitOfWork _unitOfWork;

        public LogoutService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public void Logout()
        {
            FormsAuthentication.SignOut();
        }
    }
}