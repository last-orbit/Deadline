# Deadline Task Manager

A vanilla JavaScript task management application for creating deadlines, tracking countdowns, and organizing tasks around specific deadlines.

## Features

* Create multiple deadlines with a date and time
* Live countdown for the selected deadline
* Connect tasks to specific deadlines
* Set task status and priority
* Filter tasks by deadline
* Mark tasks as complete
* Separate completed task list
* Delete deadlines and tasks
* Temporary notifications for user actions
* Persistent data using `localStorage`

## Technologies

* HTML5
* CSS3
* JavaScript
* DOM Manipulation
* `localStorage`

## How It Works

Each deadline is assigned a unique ID using `crypto.randomUUID()`. Tasks store the ID of their associated deadline, allowing the application to display only the tasks belonging to the selected deadline.

Deadline and task data are stored in the browser using `localStorage`, so data remains available after refreshing the page.

## Getting Started

Clone the repository and open the project in your browser using your preferred local development server.

No backend or database is required.

## Future Improvements

* Add celebratory feedback when all tasks for a deadline are completed
* Add a confetti animation
* Improve notification animations
* Add task editing
* Improve responsive and accessibility features
