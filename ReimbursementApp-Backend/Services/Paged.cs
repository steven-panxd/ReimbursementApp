public class Paged<T>
{
    public required IEnumerable<T> Data { get; set; }
    public required int Page { get; set; }
    public required int PageSize { get; set; }
    public int TotalCount { get; set; }
    public int TotalPages => (int)Math.Ceiling(TotalCount / (double)PageSize);
}