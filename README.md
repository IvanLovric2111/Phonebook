# Phonebook Application

## Overview

This is a full-stack contact management application built with a decoupled architecture. It uses an **Angular** frontend to interact with a **.NET Core Web API**. The system manages contacts and their phone numbers with specialized logic for handling primary (default) numbers and data validation.

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

1.  Navigate to the backend folder:
   
    ```bash
    cd Phonebook.Backend
    ```
2.  **Configuration:**
    - Copy `appsettingsexample.json` and rename the copy to `appsettings.json`.
    - Open `appsettings.json` and enter your local SQL Server connection string.
3.  **Database Migration:**
    Run this in your terminal to create the database:
    
    ```bash
    dotnet ef database update
    ```
    
4.  **Run the API:**
   
    ```bash
    dotnet run
    ```

### 3. Frontend Setup
1.  Navigate to the frontend folder:
   
    ```bash
    cd ../Phonebook.Frontend
    ```
2.  **Install & Run:**
   
    ```bash
    npm install
    ng serve -o
    ```
