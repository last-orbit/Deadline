# Deadline Task Manager

A vanilla JavaScript task management application for creating deadlines, tracking countdowns, and organizing tasks around specific deadlines. Inspired by codedex's "back to school" monthly challenge. 

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

## Resources 
* Creating a To Do list by the digital mike using local storage (https://youtu.be/lMLSPNPNWLQ?is=hN8tTDpEzoX-fE9q)
* Creating a coundown timer by Html Camp using local storage (https://youtu.be/34kbdFLpff8?is=COaSyT6KuDxe8et9)
* CSS refresher cheat sheet (https://htmlcheatsheet.com/css/)
* Trouble shooting docs: MDN and W3schools

## Future Improvements

* Add feedback when all tasks for a deadline are completed by adding a toast or confetti animation (to be completed soon).
* Add task editing.
* Create a component that could add time the deadline.
* Improve responsive layout for task list.
