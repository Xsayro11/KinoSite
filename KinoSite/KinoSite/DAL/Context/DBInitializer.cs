using System.Data.Entity;

namespace KinoSite.DAL.Context
{
    public class DBInitializer : DropCreateDatabaseIfModelChanges<Context>
    {
        protected override void Seed(Context context)
        {
            base.Seed(context);
        }
    }
}