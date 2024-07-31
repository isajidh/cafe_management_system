# API Architecture Documentation

## Overview

This document serves as a comprehensive guide to the architecture of the API hosted on Azure web app. The architecture encompasses the development workflow, version control, testing procedures, deployment strategies, and the overall structure of the API.

## Architecture Components

### 1. Hosting Environment

The API is hosted on an Azure web app, providing a scalable and reliable infrastructure for serving API requests. This ensures high availability and performance for users accessing the API.

### 2. Version Control System

The API codebase is managed using Git, with a GitHub repository containing two primary branches:

- **Dev Branch**: This branch is designated for active development. Developers work on features and fixes in their local environments and push changes to this branch for collaboration and testing.
  
- **Main Branch**: The main branch represents the stable production-ready version of the API. Changes are merged into this branch after thorough review and testing to ensure code quality and stability.

### 3. Database Hosting

The database associated with the API is hosted online, providing persistent storage for data used by the API. This separation of concerns allows for scalability and easy management of data storage.

### 4. Development Framework

The API is developed using .NET Core 8 Web API, leveraging the robust features and performance optimizations offered by the framework. The repository design pattern is employed to promote code organization, separation of concerns, and maintainability.

### 5. Local Testing Environment

Local testing of the API is facilitated through the use of Docker, Swagger, and Postman:

- **Docker**: Developers can containerize the API and its dependencies to ensure consistency across different environments and streamline the testing process.
  
- **Swagger**: Swagger UI provides an interactive documentation interface for the API, allowing developers to explore endpoints, parameters, and responses conveniently.
  
- **Postman**: Postman is utilized for testing API endpoints, enabling developers to send requests, analyze responses, and validate functionality during development iterations.

### 6. Development Workflow

The typical development workflow follows these steps:

1. Developers work on features or fixes in their local environments, utilizing Docker, Swagger, and Postman for testing and validation.
2. Changes are pushed to the dev branch on the GitHub repository for collaboration and further testing.
3. Reviewers conduct code reviews on the dev branch to ensure code quality, adherence to coding standards, and compatibility with the main branch.
4. Upon approval, changes are merged into the main branch, triggering GitHub Actions for automated build and deployment processes.

### 7. Continuous Integration and Deployment (CI/CD)

GitHub Actions are configured to automate the following tasks:

- **Build**: Whenever changes are merged into the main branch, GitHub Actions trigger a build process to create an image of the API.
  
- **Container Registry**: The created image is then pushed to the Docker Hub container registry, ensuring versioned storage and accessibility of the API image.
  
- **Webhook Integration**: A webhook is configured to detect changes in the Docker Hub container registry. Upon image updates, the webhook triggers Azure web app redeployment.
  
- **Deployment**: Azure web app automatically deploys the updated version of the API, ensuring that the hosted URL reflects the latest changes.

## Conclusion

The API architecture outlined in this document provides a robust, scalable, and efficient solution for developing, testing, deploying, and maintaining APIs hosted on Azure. By leveraging industry-standard tools and best practices, the architecture enables streamlined development workflows, reliable version control, and seamless deployment processes.