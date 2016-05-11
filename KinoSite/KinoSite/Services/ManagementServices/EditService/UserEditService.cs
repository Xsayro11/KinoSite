using KinoSite.Logging;
using KinoSite.Models.EntityModels;

namespace KinoSite.Services.ManagementServices.EditServices
{
    public class UserEditService : IEditService<User>
    {
        private ILogger _log;

        public UserEditService(ILogger log)
        {
            this._log = log;
        }

        public User Edit(User model, User modelToEdit)
        {
            if (model == null)
                return null;

            modelToEdit.Email = model.Email;
            modelToEdit.Password = model.Password;

            return modelToEdit;
        }
    }
}