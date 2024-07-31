using System;
using System.Collections.Generic;

namespace CafeEmployeeManager.API.Model;

public partial class Cafe
{
    public string Id { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string? Logo { get; set; }

    public string Location { get; set; } = null!;
}
