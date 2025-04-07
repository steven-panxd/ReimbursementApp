using Microsoft.AspNetCore.Mvc;
using ReimbursementApp_Backend.DTOs;
using ReimbursementApp_Backend.Models;
using ReimbursementApp_Backend.Services.Interfaces;

namespace ReimbursementApp_Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReimbursementController : ControllerBase
{
    private readonly ILogger<ReimbursementController> _logger;
    private readonly IReimbursementService _reimbursementService;

    public ReimbursementController(ILogger<ReimbursementController> logger, IReimbursementService reimbursementService)
    {
        _logger = logger;
        _reimbursementService = reimbursementService;
    }

    [HttpPost(Name = "PostReimbursement")]
    public async Task<ActionResult<ReimbursementRequestResponseDto>> Post([FromForm] ReimbursementRequestForm form)
    {
        int id = await _reimbursementService.CreateReimbursementAsync(form);
        return new ReimbursementRequestResponseDto() { ReimbursementId = id };
    }

    [HttpGet(Name = "GetMultipleReimbursementRecords")]
    public async Task<ActionResult<ReimbursementRecordsQueryResponseDto>> Get([FromQuery] ReimbursementRecordsQueryRequestDto dto)
    {
        Paged<ReimbursementRecord> pagedReimbursementRecords = await _reimbursementService.GetAllAsync(dto);
        return new ReimbursementRecordsQueryResponseDto(pagedReimbursementRecords);
    }
}