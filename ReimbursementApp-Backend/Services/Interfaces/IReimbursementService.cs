using System.Collections;
using ReimbursementApp_Backend.DTOs;
using ReimbursementApp_Backend.Models;

namespace ReimbursementApp_Backend.Services.Interfaces;

public interface IReimbursementService
{
    Task<int> CreateReimbursementAsync(ReimbursementRequestForm form);
    Task<Paged<ReimbursementRecord>> GetAllAsync(ReimbursementRecordsQueryRequestDto dto);
}
