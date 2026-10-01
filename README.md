# HabitTrack – Habit Tracker & Gamification Frontend

## Technology
- HTML5
- CSS3
- Vanilla JavaScript
- Browser LocalStorage

## Features
1. Dashboard
2. Add / delete habits
3. Mark habits complete
4. XP and level system
5. Daily streak
6. Progress dashboard
7. 7-day completion chart
8. Achievement badges
9. Responsive design
10. LocalStorage persistence

## How to Run
1. Extract the ZIP file.
2. Open the `habit-tracker-frontend` folder.
3. Double-click `index.html`.
4. The project will open in your browser.

No Node.js, Vite, or server is required.

## Backend Integration
This is the frontend-only version. Later, `js/app.js` can be changed to call a Spring Boot REST API using `fetch()` instead of LocalStorage.

Suggested API endpoints:
- POST /api/auth/login
- POST /api/auth/register
- GET /api/habits
- POST /api/habits
- PUT /api/habits/{id}
- DELETE /api/habits/{id}
- GET /api/progress
- GET /api/achievements
