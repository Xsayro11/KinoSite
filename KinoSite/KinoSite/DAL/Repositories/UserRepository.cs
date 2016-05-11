using KinoSite.Models.EntityModels;
using System.Linq;

namespace KinoSite.DAL.Repositories
{
    public class UserRepository : Repository<User>
    {
        public UserRepository(IContext context) : base(context) { }

        public User GetUserByEmail(string email)
        {
            return DbSet.FirstOrDefault(u => u.Email == email);
        }
    }
}