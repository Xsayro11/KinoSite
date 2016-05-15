using KinoSite.DAL.Context;
using KinoSite.Models.EntityModels;
using System;
using System.Linq;

namespace KinoSite.DAL.Repositories
{
    public class UserRepository : Repository<User>
    {
        public UserRepository(IContext context) : base(context) { }

        public User GetUserByEmail(string email)
        {
            var user = DbSet.FirstOrDefault(u => u.Email == email);
            
            if(user == null)
            {
                return new EmptyUser();
            }

            return user;
        }
    }
}