using System;
using System.Data.Entity;

namespace KinoSite.DAL.Context
{
    public interface IContext : IDisposable
    {
        DbSet<TEntity> Set<TEntity>() where TEntity : class;
        int SaveChanges();
    }
}
