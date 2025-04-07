using ReimbursementApp_Backend.Forms;
using ReimbursementApp_Backend.Models;

namespace ReimbursementApp_Backend.Services.Interfaces;

public interface IReimbursementService
{
    Task<int> CreateReimbursementAsync(ReimbursementRequestForm form);
    Task<List<ReimbursementRecord>> GetAllAsync(int page = 1, int pageSize = 10);
    Task<ReimbursementRecord?> GetByIdAsync(int id);
}
