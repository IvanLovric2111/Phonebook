# Phonebook Application

## Overview

A full-stack web application for managing contacts and their phone numbers. This project features a robust **Angular** frontend and a **.NET Core Web API** backend, utilizing Entity Framework Core for database management.

## Tech Stack

- **Frontend:** Angular, Bootstrap, RxJS.
- **Backend:** ASP.NET Core Web API, Entity Framework Core.
- **Database:** SQL Server.

## Getting Started

### 1. Prerequisites

* [Node.js](https://nodejs.org/) (v18+)
* [.NET SDK](https://dotnet.microsoft.com/download) (v8.0+)
* [SQL Server Express](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)

### 2. Backend Setup

*  Open `Phonebook.Backend.sln` in Microsoft Visual Studio
   
*  Configuration:
   
    - Copy `appsettingsexample.json` and rename the copy to `appsettings.json`
    - Open `appsettings.json` and enter your local SQL Server connection string
      
*  Database Migration:
  
    Open Package Manager Console in Tools/NuGet Package Manager and run the command:
    
    ```bash
    Update-Database
    ```
    
*  Run the API with F5

### 3. Frontend Setup

*  Navigate to the frontend folder:
   
    ```bash
    cd ../Phonebook.Frontend
    ```
    
*  Install & Run:
   
    ```bash
    npm install
    ng serve -o
    ```
