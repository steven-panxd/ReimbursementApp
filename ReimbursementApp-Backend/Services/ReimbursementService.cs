using Microsoft.EntityFrameworkCore;
using ReimbursementApp_Backend.Forms;
using ReimbursementApp_Backend.Models;
using ReimbursementApp_Backend.Data;
using ReimbursementApp_Backend.Services.Interfaces;

namespace ReimbursementApp_Backend.Services;

public class ReimbursementService : IReimbursementService
{
    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _env;

    public ReimbursementService(AppDbContext context, IWebHostEnvironment env)
    {
        _context = context;
        _env = env;
    }

    public async Task<int> CreateReimbursementAsync(ReimbursementRequestForm form)
    {
        // save uploaded receipt proof file
        string uploadsFolder = Path.Combine(_env.WebRootPath ?? "wwwroot", "receipts");
        Directory.CreateDirectory(uploadsFolder);

        // create unique file name to avoid collision
        string uniqueFileName = Guid.NewGuid() + Path.GetExtension(form.Receipt.FileName);
        string filePath = Path.Combine(uploadsFolder, uniqueFileName);

        // save receipt file to uploads folder
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await form.Receipt.CopyToAsync(stream);
        }

        // map Form to a Model
        var record = new ReimbursementRecord
        {
            RequesterName = form.RequesterName,
            RequesterId = form.RequesterId,
            PurchaseDate = form.PurchaseDate,
            Amount = form.Amount,
            ReceiptFilePath = uniqueFileName,
            Description = form.Description,
            CreatedAt = DateTime.UtcNow
        };

        _context.ReimbursementRecords.Add(record);
        await _context.SaveChangesAsync();

        return record.Id;
    }

    public async Task<List<ReimbursementRecord>> GetAllAsync(int page = 1, int pageSize = 10)
    {
        return await _context.ReimbursementRecords
            .OrderByDescending(r => r.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<ReimbursementRecord?> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
    }
}