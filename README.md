# themealdbcom-mirror

Implementing a frontend and a caching API mirroring backend for TheMealDB.com
free educational API.

## Run

### Backend

Specify the backend server arguments in the `backend/.env` file

```
NESTJS_PORT=3000
FRONTEND_DOMAIN=http://localhost
THEMEALSDBCOM_API_KEY=1
```

```
cd backend
npm i
npm run build
node dist/main.js
```

### Frontend

Specify the frontend server arguments in the `frontend/.env` file

```
PORT=5000
BACKEND_DOMAIN=http://localhost
```

```
cd frontend
npm i
npm run build
npm run start
```

## Third-Party Dependencies

The file `frontend/src/styles/yorha.css` is included for layout consistency.
It is not authored or maintained by this project. It is pinned at the latest
version to avoid old dependency issues or unexpected upstream changes.

## TODOs

- Display title based on the applied filter
- Display specific recipe country
- Display specific recipe ingredients
- Specific recipe sidebar split
- Display the list of another recipes in the current category
- Navigate to the recipe list filtered by category by clicking the sidebar
category title
- Adaptive mobile-friendly layout
- Complete ESLint setup
- Create tests
- Ensure it's linted
