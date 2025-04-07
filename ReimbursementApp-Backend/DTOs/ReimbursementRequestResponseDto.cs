using System.ComponentModel.DataAnnotations;

namespace ReimbursementApp_Backend.DTOs;

public class ReimbursementRequestResponseDto 
{
    [Required]
    public int ReimbursementId { get; set; }
}