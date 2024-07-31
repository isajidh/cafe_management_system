using System;
using System.Collections.Generic;

namespace CafeEmployeeManager.API.Model;

public partial class Employeecaferelationship
{
    public string EmployeeId { get; set; } = null!;

    public string CafeId { get; set; } = null!;

    public DateTime StartDate { get; set; }
}
