import React from "react";
import { render, screen } from "@testing-library/react";
import Employees from "./Employees";

describe("Employe", () => {
  test("renders the employee table", () => {
    render(<Employees />);

    // Check if the table headers are present
    expect(screen.getByText("Employee ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("Days Worked")).toBeInTheDocument();
    expect(screen.getByText("Cafe Name")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  test("renders the add new employee button", () => {
    render(<Employees />);

    // Check if the add new employee button is present
    expect(screen.getByText("Add New Employee")).toBeInTheDocument();
  });
});
