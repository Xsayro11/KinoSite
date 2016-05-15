using Autofac;
using Autofac.Integration.Mvc;
using KinoSite.BL.AccountManagment;
using KinoSite.BL.SessionManagment;
using KinoSite.DAL.Context;
using KinoSite.Logging;
using KinoSite.Services.AccountService;
using KinoSite.Services.UnitOfWorkService;
using log4net.AutoFac;
using System.Web.Mvc;

namespace KinoSite
{
    public class AutofacConfig
    {
        public static void ConfigureContainer()
        {
            var builder = new ContainerBuilder();

            RegisterTypes(builder);

            builder.RegisterControllers(typeof(MvcApplication).Assembly);

            builder.RegisterModule(new LoggingModule());

            var container = builder.Build();

            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
        }

        private static void RegisterTypes(ContainerBuilder builder)
        {
            builder.RegisterType<Context>().As<IContext>().InstancePerRequest();

            builder.RegisterType<Log4NetLoggingAdapter>().As<ILogger>();

            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>();

            builder.RegisterType<AccountManager>().As<IAccountManager>();

            builder.RegisterType<SessionManager>().As<ISessionManager>();

            builder.RegisterType<Account>().As<IAccount>();
        }
    }
}