using System;
using System.Web;

namespace KinoSite.BL.SessionManagment
{
    public class SessionManager : ISessionManager
    {
        public Guid GetCurrentSessionID()
        {
            var sessionCookie = HttpContext.Current.Request.Cookies["Session"];

            if(sessionCookie != null)
            {
                var sessionID = sessionCookie.Values["SessionID"];
                return new Guid(sessionID);
            }
            else
            {
                return Guid.Empty;
            }
        }
    }
}