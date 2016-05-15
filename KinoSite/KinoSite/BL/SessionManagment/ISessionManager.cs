using System;

namespace KinoSite.BL.SessionManagment
{
    public interface ISessionManager
    {
        Guid GetCurrentSessionID();
    }
}