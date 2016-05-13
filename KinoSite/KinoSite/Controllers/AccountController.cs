using KinoSite.Models.ViewModels;
using KinoSite.ModelStateWrappers;
using KinoSite.Services.AccountService;
using KinoSite.Services.UnitOfWorkService;
using System.Web.Mvc;

namespace KinoSite.Controllers
{
    public class AccountController : Controller
    {
        private IUnitOfWork _unitOfWork;
        private IAccount _account;
        public delegate IValidationDictionary ModelValidationFactory(ModelStateDictionary msd);
        public delegate Account AccountServiceFactory(ModelStateDictionary msd);

        public AccountController(IUnitOfWork unitOfWork, AccountServiceFactory accountFactory)
        {
            _unitOfWork = unitOfWork;
            _account = accountFactory(ModelState);
        }

        [HttpPost]
        public ActionResult Register(AccountViewModel user)
        {
            using (_unitOfWork)
            {
                if (_account.IsValid(user))
                {
                    _account.Register(user);
                    _account.Login(user);
                }
                else
                {
                    ModelState.AddModelError("", "");
                }
            }
            return View();
        }

        [HttpPost]
        public ActionResult Login(AccountViewModel user)
        {
            using (_unitOfWork)
            {
                if (_account.IsValid(user))
                {
                    if(_account.Login(user))
                    {
                        ModelState.AddModelError("", "");
                    }
                }
                else
                {
                    ModelState.AddModelError("", "");
                }
            }

            return View();
        }
    }
}