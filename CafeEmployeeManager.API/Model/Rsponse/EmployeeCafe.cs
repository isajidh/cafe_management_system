using System;
using System.Collections.Generic;

namespace CafeEmployeeManager.API.Model;

public partial class EmployeeCafe
{
    public string EmployeeId { get; set; } = null!;
    public string EmployeeName { get; set; } = null!;
    public string EmailAddress { get; set; } = null!;
    public string PhoneNumber { get; set; } = null!;
    public string CafeId { get; set; } = null!;
    public string CafeName { get; set; } = null!;
    public int DaysWorked { get; set; }
}
