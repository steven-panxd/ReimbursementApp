using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http.HttpResults;
using ReimbursementApp_Backend.Models;

namespace ReimbursementApp_Backend.DTOs;


public class ReimbursementRecordDto {
    public int Id { get; set; }

    public string RequesterName { get; set; }

    public string RequesterId { get; set; }

    public DateOnly PurchaseDate { get; set; }

    public decimal Amount { get; set; }

    public string ReceiptUrl { get; set; }

    public string Description { get; set; }

    public DateTime CreatedAt { get; set; }

    public ReimbursementRecordDto(ReimbursementRecord model) { 
        Id = model.Id;
        RequesterName = model.RequesterName;
        RequesterId = model.RequesterId;
        PurchaseDate = model.PurchaseDate;
        Amount = model.Amount;
        ReceiptUrl = model.ReceiptFilePath;
        Description = model.Description;
        CreatedAt = model.CreatedAt;
    }
}