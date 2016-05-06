using Autofac;
using Autofac.Integration.Mvc;
using KinoSite.DAL;
using KinoSite.Logging;
using KinoSite.Repository;
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
            builder.RegisterType<Context>().As<IContext>();

            builder.RegisterGeneric(typeof(Repository<>)).As(typeof(IRepository<>));

            builder.RegisterType<Log4NetLoggingAdapter>().As<ILogger>();
        }
    }
}