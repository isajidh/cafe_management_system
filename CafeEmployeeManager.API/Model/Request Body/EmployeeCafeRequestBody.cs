namespace CafeEmployeeManager.API.Model.Request_Body
{
    public class EmployeeCafeRequestBody
    {
        public string EmployeeId { get; set; }
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public string PhoneNumber { get; set; }
        public Gender Gender { get; set; } // Assuming you have an enum for gender
        public string CafeId { get; set; }
        public DateTime StartDate { get; set; }
    }

    // Enum for gender (if not already defined)
    public enum Gender
    {
        Male,
        Female
    }
}
