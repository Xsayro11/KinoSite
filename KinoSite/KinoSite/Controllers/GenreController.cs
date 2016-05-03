using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KinoSite.Controllers
{
    public class GenreController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Category()
        {
            return View();
        }

        public ActionResult Details()
        {
            return View();
        }

        public ActionResult Description()
        {
            return PartialView();
        }

        public ActionResult Comments()
        {
            return PartialView();
        }

        public ActionResult Reviews()
        {
            return PartialView();
        }

        public ActionResult Review()
        {
            return PartialView();
        }

        public ActionResult Creators()
        {
            return PartialView();
        }

        public ActionResult Trailers()
        {
            return PartialView();
        }

        public ActionResult Awards()
        {
            return PartialView();
        }

        public ActionResult Stills()
        {
            return PartialView();
        }
    }
}