using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace KinoSite.DAL
{
    public abstract class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected IDbSet<TEntity> DbSet;

        public Repository(IContext context)
        {
            DbSet = context.Set<TEntity>();
        }

        public List<TEntity> GetAll()
        {
            return this.DbSet.ToList();
        }

        public TEntity GetByID(int id)
        {
            return this.DbSet.Find(id);
        }

        public TEntity GetByID(Guid id)
        {
            return this.DbSet.Find(id);
        }

        public void Add(TEntity entity)
        {
            this.DbSet.Add(entity);
        }

        public void Delete(TEntity entity)
        {
            this.DbSet.Remove(entity);
        }
    }
}