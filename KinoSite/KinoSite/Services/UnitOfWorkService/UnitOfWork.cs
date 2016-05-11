using KinoSite.DAL;
using KinoSite.DAL.Repositories;
using System;

namespace KinoSite.Services.UnitOfWorkService
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private IContext _context;
        private Lazy<UserRepository> _userRepository;
        private Lazy<SessionRepository> _sessionRepository;

        public UnitOfWork(IContext context)
        {
            _context = context;
            _userRepository = new Lazy<UserRepository>(() => new UserRepository(_context));
            _sessionRepository = new Lazy<SessionRepository>(() => new SessionRepository(_context));
        }

        public UserRepository UserRepository
        {
            get
            {
                return _userRepository.Value;
            }
        }

        public SessionRepository SessionRepository
        {
            get
            {
                return _sessionRepository.Value;
            }
        }

        public void SaveChanges()
        {
            if (_context != null)
                _context.SaveChanges();
        }

        public void Dispose()
        {
            if (_context != null)
                _context.Dispose();
        }
    }
}