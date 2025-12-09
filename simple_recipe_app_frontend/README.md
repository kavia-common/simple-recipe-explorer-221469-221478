# Simple Recipe App — Angular Frontend

A lightweight recipe browser with search and detail view following the "Ocean Professional" theme.

## Run the app (port 3000)
```bash
npm install
npm start
# open http://localhost:3000
```
The Angular dev-server is configured to run on port 3000 for preview systems.

## API configuration
The app reads the API base URL from environment variables:
- `NG_APP_API_BASE` or `NG_APP_BACKEND_URL`

If neither is provided, it falls back to local mock data at `assets/recipes.json`.

Example:
```bash
# Linux/macOS
NG_APP_API_BASE="https://my-api.example.com" npm start
# Windows (PowerShell)
$env:NG_APP_API_BASE="https://my-api.example.com"; npm start
```
Expected API endpoints:
- `GET {API_BASE}/recipes` -> Recipe[]
- `GET {API_BASE}/recipes/:id` -> Recipe

Other envs considered but optional:
- `NG_APP_FRONTEND_URL`, `NG_APP_WS_URL`, `NG_APP_NODE_ENV`,
  `NG_APP_ENABLE_SOURCE_MAPS`, `NG_APP_PORT`, `NG_APP_LOG_LEVEL`,
  `NG_APP_FEATURE_FLAGS`

## Features
- Responsive grid of recipe cards
- Top search bar filters by name/ingredient/tag (300ms debounce)
- Details view with ingredients and steps
- Basic routing:
  - `/` list page
  - `/recipe/:id` details page (deep linking)
- State preserved in a service (search query)
- OnPush change detection, trackBy for lists
- Friendly empty and error states
- Themed styling with accessible contrasts

## Testing hooks
- `data-testid="search-input"` on the search field
- `data-testid="recipe-card"` on cards
- `data-testid="recipe-detail-title"` on the details title

## Assets
Mock data in `src/assets/recipes.json`. Placeholder filenames are listed in `src/assets/placeholder/README.txt`. Replace with real images as desired.
