using System.Data.Entity;

namespace KinoSite.DAL
{
    public class DBInitializer : DropCreateDatabaseIfModelChanges<Context>
    {
        protected override void Seed(Context context)
        {
            base.Seed(context);
        }
    }
}