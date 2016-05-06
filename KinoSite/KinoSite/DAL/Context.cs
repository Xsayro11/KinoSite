using System.Data.Entity;

namespace KinoSite.DAL
{
    public class Context : DbContext, IContext
    {
        public Context()
            : base("name=BookStoreLocalDB")
        {
            Database.SetInitializer(new DBInitializer());
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}