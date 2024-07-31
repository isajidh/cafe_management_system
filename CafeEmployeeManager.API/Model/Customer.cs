using System;
using System.Collections.Generic;

namespace CafeEmployeeManager.API.Model;

public partial class Customer
{
    public int CustomerId { get; set; }

    public string? Name { get; set; }

    public int? Phone { get; set; }

    public string? Email { get; set; }

    public string? Address { get; set; }

    public string? CustomerType { get; set; }

    public string? CompanyName { get; set; }

    public string? AdditionalInformation { get; set; }
}
