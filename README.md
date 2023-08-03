# User Management App with Todo List

This is a simple React web application that allows users to manage a list of users. Users can be searched, added, updated, and deleted. Each user also has a todo list where they can add, delete tasks, and see if they have completed all the tasks.

## Features

- Fetch user data from an API and display it on the page
- Filter users based on search terms (by name or email)
- Add new users to the list
- Show additional data (street, city, zip code) when hovering over the "Other data" button
- Update user information
- Delete users from the list
- Manage a todo list for each user:
  - Add new tasks to the list
  - Delete tasks from the list
  - See if all tasks are completed

## Getting Started
To run this project locally, follow these steps:

1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/your-username/react-user-management-app.git
    ```
2. Change into the project directory:
    ```
    cd User-Management-App
    ```
3. Install dependencies:
    ```
    npm install
    ```

## Usage
Start the application:
```
npm start
```

## Dependencies
This project relies on the following dependencies:
- React: A JavaScript library for building user interfaces.
- axios: A library for making HTTP requests to the API.
- CSS: Stylesheets for layout and styling.

## API
This app fetches user data from the JSONPlaceholder API. The API returns a list of users with their respective information.

## Todo List
Each user in the app has a todo list feature. The todo list allows users to manage their tasks. The main features of the todo list are:

- Add new tasks to the list
- Delete tasks from the list
- See if all tasks are completed
