using System.Collections;
using System.ComponentModel.DataAnnotations;
using ReimbursementApp_Backend.Models;

namespace ReimbursementApp_Backend.DTOs;


public class ReimbursementRecordsQueryResponseDto {
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }
    public int TotalCount { get; set; }
    public IEnumerable<ReimbursementRecordDto> Records { get; set; }

    public ReimbursementRecordsQueryResponseDto(Paged<ReimbursementRecord> pagedModels) {
        // foreach every single model object and create dto accordingly
        IEnumerable<ReimbursementRecordDto> reimbursementRecordDtos = pagedModels.Data.Select(model => new ReimbursementRecordDto(model));

        Page = pagedModels.Page;
        PageSize = pagedModels.PageSize;
        TotalPages = pagedModels.TotalPages;
        Records = reimbursementRecordDtos;
        TotalCount = pagedModels.TotalCount;
    }
}