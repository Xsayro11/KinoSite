using KinoSite.Services.ManagementServices.AddServices;
using KinoSite.Services.ManagementServices.DeleteServices;
using KinoSite.Services.ManagementServices.EditServices;

namespace KinoSite.Services.ManagementServices
{
    public interface IManagementServices<T> where T : class
    {
        IAddService<T> AddService { get; }
        IEditService<T> EditService { get; }
        IDeleteService<T> DeleteService { get; }
    }
}