using System.ComponentModel.DataAnnotations;

namespace BookStoreProject.API.Data
{
    public class Entertainer
    {
        [Key]
        public int EntertainerID { get; set; }

        public string? EntStageName { get; set; }
        public string? EntSSN { get; set; }
        public string? EntStreetAddress { get; set; }
        public string? EntCity { get; set; }
        public string? EntState { get; set; }
        public string? EntZipCode { get; set; }
        public string? EntPhoneNumber { get; set; }
        public string? EntWebPage { get; set; }
        public string? EntEMailAddress { get; set; }
        public string? DateEntered { get; set; }
    }

    public class EntertainerSummaryDto
    {
        public int EntertainerID { get; set; }
        public string? EntStageName { get; set; }
        public int BookingCount { get; set; }
        public string? LastBookingDate { get; set; }
    }
}