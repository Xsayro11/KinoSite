using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace KinoSite.Models.EntityModels
{
    public class User
    {
        public Guid UsetID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

    public class UserConfiguration : EntityTypeConfiguration<User>
    {
        public UserConfiguration()
        {
            HasKey(a => a.UsetID);
            Property(a => a.FirstName).IsRequired();
            Property(a => a.LastName).IsRequired();
        }
    }
}