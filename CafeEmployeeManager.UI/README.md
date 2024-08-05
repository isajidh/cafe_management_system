---
---

# Cafe Employee Manager Application

## Overview

This is a full-stack application for managing cafes and their employees. The front-end is built with ReactJS, Redux, Redux-Saga, React Router, Material-UI, and AgGrid. The back-end is a .NET Core web API, and the database is MySQL.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (v20 or higher)
- Yarn (v1.22 or higher)
- .NET 8.0
- MySQL Server
- Visual Studio Code or any other preferred code editor

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/isajidh/cafe_management_system.git
cd cafe_management_system
```

### 2. Setting Up the MySQL Database

1. **Create a Database**:

   ```sh
   mysql -u root -p
   CREATE DATABASE cafe_management_db;
   USE cafe_management_db;
   ```

2. **Import the Database Schema and Data**:
   Use the provided `cafe_management_schema.sql` file to set up the database schema and data:
   ```sh
   mysql -u root -p cafe_management_db < path/to/cafe_management_schema.sql
   ```

### 3. Setting Up the .NET Core Web API

1. **Navigate to the API Directory**:

   ```sh
   cd CafeEmployeeManager.API
   ```

2. **Restore Dependencies**:

   ```sh
   dotnet restore
   ```

3. **Update Connection String**:
   Update the connection string in `appsettings.json` to match your MySQL database configuration:

   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=localhost;Database=cafe_management_db;User=root;Password=yourpassword;"
   }
   ```

4. **Run the API**:
   ```sh
   dotnet run
   ```

### 4. Setting Up the ReactJS Front-End

1. **Navigate to the React Application Directory**:

   ```sh
   cd ../CafeEmployeeManager.UI
   ```

2. **Install Dependencies**:

   ```sh
   yarn install
   ```

3. **Run the React Application**:
   ```sh
   yarn start
   ```

### 5. Running Tests

To run the unit tests for the React application:

```sh
yarn test
```

## Usage

- **Café Page**:

  - Lists all cafes.
  - Features include filtering by location, adding a new café, and editing/deleting cafes.
  - Clicking on the employees count navigates to the Employees page showing employees under that café.

- **Employee Page**:
  - Lists all employees.
  - Features include adding a new employee, and editing/deleting employees.

## Troubleshooting

- **Common Errors**:

  - **Database Connection**: Ensure your MySQL server is running and the connection string in `appsettings.json` is correct.
  - **API Not Running**: Ensure you have navigated to the API directory and run `dotnet run`.

- **Logs and Debugging**:
  - Check the terminal for any error messages and stack traces.
  - For database-related issues, check MySQL logs.

---

By following this README, you should be able to set up and run the Cafe Employee Manager application on your local machine. If you encounter any issues, please refer to the Troubleshooting section or reach out me in [Linkedin](https://www.linkedin.com/in/isajidh/) for support.
