using System;
using System.Data.Entity.ModelConfiguration;

namespace KinoSite.Models.EntityModels
{
    public class Session
    {
        public Guid SessionID { get; set; }
        public Guid UserID { get; set; }
        public DateTime CreatedDate { get; set; }

        public virtual User User { get; set; }
    }

    public class SessionConfiguration : EntityTypeConfiguration<Session>
    {
        public SessionConfiguration()
        {
            HasKey(s => s.SessionID);
            Property(s => s.CreatedDate).IsRequired();
            HasRequired(s => s.User).WithMany(u => u.Sessions).HasForeignKey(s => s.UserID);
        }
    }
}