namespace CafeEmployeeManager.API.Model.Request_Body
{
    public class EmployeeCafeRequestBody
    {
        public string EmployeeId { get; set; }
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public string PhoneNumber { get; set; }
        public String Gender { get; set; }
        public string CafeId { get; set; }
        public DateTime StartDate { get; set; }
    }
}

