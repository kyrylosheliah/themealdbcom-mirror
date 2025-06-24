# themealdbcom-mirror

## Run

### Backend

Specify the backend server arguments in the `backend/.env` file

```
NESTJS_PORT=3000
FRONTEND_DOMAIN=http://localhost
THEMEALSDBCOM_API_KEY=1
```

```
cd frontend
npm i
npm run start
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
npm run start
```

## TODOs

- Create endpoints:
    - list available recipes (empty search query params)
    - filter-search by ingredients / countries / categories
    - get recipe entity info
- API calls interceptor for caching
- Recipe List Page
- Recipe Info Page
- Setup ESLint
- Set up tests
- Provide run instructions
- Ensure it's linted and formatted
