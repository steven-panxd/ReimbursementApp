using Microsoft.AspNetCore.Mvc;
using ReimbursementApp_Backend.Forms;
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
    public async Task<ActionResult<int>> Post([FromForm] ReimbursementRequestForm form)
    {
        int id = await _reimbursementService.CreateReimbursementAsync(form);
        return CreatedAtAction(nameof(Post), new { id }, new { id });
    }
}