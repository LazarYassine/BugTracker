# BugTracker

BugTracker is a web-based application designed for developers to store and manage bugs they encounter while coding. It provides an easy and efficient way to track bugs and store solutions for future reference. BugTracker comes with a user authentication system with JWT tokens that allow users to sign up, sign in, and securely access their bug reports.

## Technologies Used

- .NET Core Web API
- Angular Framework
- Prime NG
- JWT Authentication

## Features

- User authentication system
- Add, edit, delete, and search for bugs
- Add solutions to the bugs and store them for future reference
- Secure and reliable

## Installation and Usage

To run the application, you need to have the following prerequisites installed on your system:

- .NET Core SDK 6
- Angular CLI 10 or later
- Node.js 12 or later

### Backend

1. Clone the repository by running `git clone https://github.com/LazarYassine/BugTracker_Backend.git`
2. Navigate to the project folder
3. Run `dotnet restore` to restore the required packages
4. Run `dotnet run` to start the API server

### Frontend

1. Clone the repository by running `git clone https://github.com/LazarYassine/BugTracker_FrontEnd.git`
2. Navigate to the project folder
3. Run `npm install` to install the required dependencies
4. Run `ng serve` to start the Angular server
5. The server should now be running on `http://localhost:4200`

## Important: Running SQL Scripts

Before running the backend side of BugTracker, it is crucial to set up the database by running the provided SQL scripts. These scripts create the necessary tables and establish the required relationships between them. Please follow the instructions below to run the SQL scripts:

1. Open the SQL script file `bugtrackerdb.sql` located in the repository.
2. Execute the SQL script in a database management tool or query editor to create the `BugTrackerDB` database, the `Bug` table, and the `UserInfo` table.
3. Make sure the database connection settings in the backend code match your database configuration (e.g., server name, credentials).

It is essential to complete these steps to ensure the proper functioning of the BugTracker application. After running the SQL scripts and configuring the database connection, you can proceed with the backend and frontend installation as described above.

## Video Description

[Click here](https://www.youtube.com/watch?v=ZS9yExSgMgs) to watch a video in which I describe the project in my own voice.

## Future Improvements

- Add unit tests and integration tests
- Add more advanced search features
- Add email notifications for bug updates
- Allow users to add attachments and screenshots to bug reports

## Conclusion

BugTracker is a reliable and easy-to-use bug tracking system that allows developers to efficiently store, manage, and track bugs. The combination of .NET Core Web API and Angular Framework makes it a powerful and scalable solution for developers of all skill levels.
