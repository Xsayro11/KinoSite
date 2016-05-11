using KinoSite.Logging;
using KinoSite.Models.EntityModels;

namespace KinoSite.Services.ManagementServices.DeleteServices
{
    public class UserDeleteService : IDeleteService<User>
    {
        private ILogger _log;

        public UserDeleteService(ILogger log)
        {
            this._log = log;
        }

        public void Delete(int? id)
        {
            if (id == null)
                return;
        }
    }
}