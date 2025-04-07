using Microsoft.EntityFrameworkCore;
using ReimbursementApp_Backend.DTOs;
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

    public async Task<Paged<ReimbursementRecord>> GetAllAsync(ReimbursementRecordsQueryRequestDto dto)
    {
        // implemented basic pagination
        int totalCount = _context.ReimbursementRecords.Count();

        IEnumerable<ReimbursementRecord> reimbursementRecords = await _context.ReimbursementRecords
            .OrderByDescending(r => r.CreatedAt)
            .Skip((dto.page - 1) * dto.pageSize)
            .Take(dto.pageSize)
            .ToListAsync();
        
        // use Paged class to encapsulate multiple model objects
        return new Paged<ReimbursementRecord>
        {
            Data = reimbursementRecords,
            Page = dto.page,
            PageSize = dto.pageSize,
            TotalCount = totalCount
        };
    }
}