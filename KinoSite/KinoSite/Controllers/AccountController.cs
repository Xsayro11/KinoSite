using KinoSite.Models.ViewModels;
using KinoSite.Services.AccountService;
using KinoSite.Services.UnitOfWorkService;
using System.Web.Mvc;

namespace KinoSite.Controllers
{
    public class AccountController : Controller
    {
        private IUnitOfWork _unitOfWork;
        private IAccount _account;

        public AccountController(IUnitOfWork unitOfWork, IAccount account)
        {
            _unitOfWork = unitOfWork;
            _account = account;
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Register(AccountViewModel user)
        {
            using (_unitOfWork)
            {
                if (ModelState.IsValid)
                {
                    if (!_account.UserExists(user.Email))
                    {
                        _account.Register(user.Email, user.Password);
                        _account.Login();
                        _unitOfWork.SaveChanges();
                    }
                    else
                    {
                        ModelState.AddModelError("Error", "User with this email already exists!");
                    }
                }
            }

            return PartialView("AccountPartial", user);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(AccountViewModel user)
        {
            using (_unitOfWork)
            {
                if (ModelState.IsValid)
                {
                    if (_account.Login(user.Email, user.Password))
                    {
                        _unitOfWork.SaveChanges();
                    }
                    else
                    {
                        ModelState.AddModelError("Error", "Email or password is not correct!");
                    }
                }
            }

            return PartialView("AccountPartial", user);
        }
    }
}