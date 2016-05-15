using KinoSite.DAL.Context;
using KinoSite.Models.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KinoSite.DAL.Repositories
{
    public class SessionRepository : Repository<Session>
    {
        public SessionRepository(IContext context) : base(context) { }

        public List<Session> GetAllSessionsByCreatedDate(DateTime createdDate)
        {
            return DbSet.Where(s => s.CreatedDate == createdDate).ToList();
        }
    }
}