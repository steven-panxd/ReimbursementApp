using Microsoft.EntityFrameworkCore;
using ReimbursementApp_Backend.Models;

namespace ReimbursementApp_Backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<ReimbursementRecord> ReimbursementRecords { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ReimbursementRecord>()
            .Property(r => r.Amount)
            .HasColumnType("decimal(18,2)");
    }
}
