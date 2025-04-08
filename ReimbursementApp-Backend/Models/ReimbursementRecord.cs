using System.ComponentModel.DataAnnotations;

namespace ReimbursementApp_Backend.Models
{
    public class ReimbursementRecord
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string RequesterName { get; set; }

        [Required]
        [MaxLength(8)]
        public string RequesterId { get; set; }

        [Required]
        public DateOnly PurchaseDate { get; set; }

        [Required]
        [Range(0.01, double.MaxValue)]
        public decimal Amount { get; set; }

        [Required]
        [MaxLength(255)]
        public string ReceiptFilePath { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Description { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
