using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;

namespace KinoSite.Models.EntityModels
{
    public class User
    {
        public Guid UsetID { get; set; }
        public string Nickname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime BirthDate { get; set; }
        public DateTime RegisterDate { get; set; }

        public virtual List<Session> Sessions { get; set; }
    }

    public class UserConfiguration : EntityTypeConfiguration<User>
    {
        public UserConfiguration()
        {
            HasKey(u => u.UsetID);
            Property(u => u.Email).IsRequired();
            Property(u => u.Password).IsRequired();
            Property(u => u.RegisterDate).IsRequired();
            HasMany(u => u.Sessions).WithRequired(s => s.User).HasForeignKey(s => s.UserID);
        }
    }
}