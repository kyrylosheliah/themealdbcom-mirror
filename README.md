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

- Create tests
- Ensure it's linted
