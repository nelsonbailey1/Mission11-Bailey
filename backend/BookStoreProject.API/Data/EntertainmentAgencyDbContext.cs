using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using BookStoreProject.API.Data;

namespace BookStoreProject.API.Data
{
    public class EntertainmentAgencyDbContext : DbContext
    {
        public EntertainmentAgencyDbContext(DbContextOptions<EntertainmentAgencyDbContext> options)
            : base(options)
        {
        }

        public DbSet<Entertainer> Entertainers { get; set; }
        public DbSet<Engagement> Engagements { get; set; }
    }

    public class Engagement
    {
        [Key]
        public int EngagementNumber { get; set; }
        public string? StartDate { get; set; }
        public string? EndDate { get; set; }
        public string? StartTime { get; set; }
        public string? StopTime { get; set; }
        public decimal? ContractPrice { get; set; }
        public int CustomerID { get; set; }
        public int AgentID { get; set; }
        public int EntertainerID { get; set; }
    }
}