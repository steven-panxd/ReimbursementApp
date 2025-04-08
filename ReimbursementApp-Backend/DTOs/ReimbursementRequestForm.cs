using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace ReimbursementApp_Backend.DTOs;


// This is a Form instead of a DTO because we want to support IFormFile in Swagger
public class ReimbursementRequestForm 
{
    [Required(ErrorMessage = "Please input your name.")]
    [MaxLength(100, ErrorMessage = "Your name is too long, it should be less than 100 characters.")]
    public string RequesterName { get; set; }

    [Required(ErrorMessage = "Please input your ID.")]
    [RegularExpression(@"^\d{8}$", ErrorMessage = "Your ID must be exactly 8 digits.")]
    public string RequesterId { get; set; }
    
    [Required(ErrorMessage = "Please input the date.")]
    [DataType(DataType.Date, ErrorMessage = "Please input a valid date.")]
    [NotInFuture(ErrorMessage = "In valid date, your date is in the future.")]
    public DateOnly PurchaseDate { get; set; }
    
    [Required(ErrorMessage = "Please input the amount.")]
    [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be bigger than or equal to $0.01.")]
    [DecimalPrecision(2, ErrorMessage = "Amount can only have at most 2 decimal places")]
    public decimal Amount { get; set; }
    
    [Required(ErrorMessage = "Please upload your receipt.")]
    [AllowedExtensions([".jpg", ".jpeg", ".png", ".pdf"], ErrorMessage = "Invalid receipt file, only following file extentions are allowed: jpg, jpeg, png, pdf.")]
    public IFormFile Receipt { get; set; }
    
    [Required(ErrorMessage = "Please input the description of your reimbursement request.")]
    [MaxLength(1000, ErrorMessage = "Description must be less than 1000 characters.")]
    public string Description { get; set; }
}

// custom Validator for Amount, make sure it only contains 2 decimal places
public class DecimalPrecisionAttribute : ValidationAttribute
{
    private readonly int _maxDecimalPlaces;

    public DecimalPrecisionAttribute(int maxDecimalPlaces)
    {
        _maxDecimalPlaces = maxDecimalPlaces;
    }

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        // we will not validate if it is null, it should be validated by Required
        if (value == null) { return ValidationResult.Success; }
        
        if (value is decimal decimalValue)
        {
            // make sure the strValue is 123.45 instead of something like 123,45
            string strValue = decimalValue.ToString(CultureInfo.InvariantCulture);
            var parts = strValue.Split('.');

            if (parts.Length == 2 && parts[1].Length > _maxDecimalPlaces)
            {
                return new ValidationResult(ErrorMessage ?? $"Your number can not have more than {_maxDecimalPlaces} decimal places.");
            }
        }

        return ValidationResult.Success;
    }
}


// custom Validator for PurchaseDate, make sure it is in the past not in the future
public class NotInFutureAttribute : ValidationAttribute
{
    public NotInFutureAttribute()
    {
        ErrorMessage = "The date cannot be in the future.";
    }

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        // we will not validate if it is null, it should be validated by Required
        if (value == null) { return ValidationResult.Success; }
        
        if (value is DateOnly date)
        {
            // we add 14 to utc time since we want to accomodate UTC+14, which is the earlies timezone around the world.
            var maxPossibleToday = DateOnly.FromDateTime(DateTime.UtcNow.AddHours(14));

            if (date > maxPossibleToday)
            {
                return new ValidationResult(ErrorMessage ?? "The date cannot be in the future.");
            }
        }

        return ValidationResult.Success;
    }

}


// custom Validator for Receipt, make sure only specified file extentions are allowed
public class AllowedExtensionsAttribute : ValidationAttribute
{
    private readonly string[] _extensions;

    public AllowedExtensionsAttribute(string[] extensions)
    {
        _extensions = extensions;
    }

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        // we will not validate if it is null, it should be validated by Required
        if (value == null) { return ValidationResult.Success; }

        // if current file's extension is not in _extensions, then failed 
        if (value is IFormFile file)
        {
            var extension = Path.GetExtension(file.FileName).ToLower();

            Console.WriteLine(extension);
            Console.WriteLine(_extensions);

            if (!_extensions.Contains(extension))
            {
                return new ValidationResult($"Only the following file types are allowed: {string.Join(", ", _extensions)}");
            }
        }

        // otherwise, succeed
        return ValidationResult.Success;
    }
}