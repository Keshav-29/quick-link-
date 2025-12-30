\# Quick-Link URL Shortener



\## Overview

Quick-Link is a full-stack URL shortener built as part of an internship technical assessment.

It allows users to generate short URLs that redirect to the original destination.



\## Tech Stack

\- Backend: Deno (Oak framework)

\- Frontend: React (Vite)

\- Database: SQLite

\- Infrastructure: Docker Compose



\## Features

\- URL shortening and redirection

\- Plus-One logic for short code generation

\- Mandatory custom header validation

\- Blocked domain safety check (blocked.com)

\- Loading and error handling in the UI

\- Fully dockerized application



\## Project Structure

The project follows a clear separation of concerns:

\- `backend/` handles API routes, business logic, and database access

\- `routes/` and `services/` separate endpoints from reusable logic

\- `frontend/` handles UI, user interaction, and API communication



This structure improves maintainability and readability.



\## How to Run the Project

Ensure Docker Desktop is running, then execute:



```bash

docker-compose up



