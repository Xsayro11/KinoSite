using KinoSite.Models.EntityModels;
using System.Data.Entity;

namespace KinoSite.DAL
{
    public class Context : DbContext, IContext
    {
        public Context()
            : base("name=LocalDB")
        {
            Database.SetInitializer(new DBInitializer());
        }

        public virtual IDbSet<User> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new UserConfiguration());
        }
    }
}