using KinoSite.DAL.Repositories;
using System;

namespace KinoSite.Services.UnitOfWorkService
{
    public interface IUnitOfWork : IDisposable
    {
        UserRepository UserRepository { get; }
        SessionRepository SessionRepository { get; }
        void SaveChanges();
    }
}