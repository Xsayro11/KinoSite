using System;
using System.Collections.Generic;

namespace KinoSite.DAL
{
    public interface IRepository<TEntity> where TEntity : class
    {
        List<TEntity> GetAll();
        TEntity GetByID(int id);
        TEntity GetByID(Guid id);
        void Add(TEntity entity);
        void Delete(TEntity entity);
    }
}
