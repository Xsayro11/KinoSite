using KinoSite.DAL;
using KinoSite.Models.EntityModels;
using KinoSite.Services.ManagementServices;
using System.Linq;

namespace KinoSite.Services.UserService
{
    public class UserService : IUserService
    {
        private IRepository<User> _userRepository;
        private IManagementServices<User> _userManagementServices;

        public UserService(IRepository<User> userRepository, IManagementServices<User> userManagementServices)
        {
            this._userRepository = userRepository;
            this._userManagementServices = userManagementServices;
        }

        public User AddUser(User model)
        {
            var users = _userRepository.GetAll();
            model = this._userManagementServices.AddService.Add(model, users);
            _userRepository.Add(model);
            return model;
        }

        public User EditUser(User model, int userId)
        {
            var editUser = _userRepository.GetByID(userId);
            model = this._userManagementServices.EditService.Edit(model, editUser);
            return model;
        }

        public void DeleteUser(int? userId)
        {
            this._userManagementServices.DeleteService.Delete(userId);
            var editUser = _userRepository.GetByID(userId.Value);
            _userRepository.Delete(editUser);
        }
    }
}