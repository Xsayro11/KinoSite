using KinoSite.Models.ViewModels;
using System.Web.Mvc;

namespace KinoSite.Controllers
{
    public class AccountController : Controller
    {
        [HttpPost]
        public ActionResult Register(AccountViewModel user)
        {
            return View();
        }

        [HttpPost]
        public ActionResult Register()
        {
            return View();
        }
    }
}