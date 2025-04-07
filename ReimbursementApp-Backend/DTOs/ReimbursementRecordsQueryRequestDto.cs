using System.ComponentModel.DataAnnotations;

namespace ReimbursementApp_Backend.DTOs;


public class ReimbursementRecordsQueryRequestDto {
    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "Your page can not be smaller than 1.")]
    public int page { get; set; }

    [Required]
    [Range(1, 100, ErrorMessage = "Your page size can not be smaller than 1 and can not be bigger than 100.")]
    public int pageSize { get; set; }
}