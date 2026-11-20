# WeldStock

A mini-ERP for auto repair shops and metal fabrication workshops. It tracks fast-consuming welding materials (electrodes, wire spools, contact tips) and warns visually, in red, when an item is close to running out. Gas cylinders (Argon, Corgon) get their own section in a later stage, with supplier, pick-up date and rental/pressure-test expiry.

## Data model

| Field      | Type         | Notes                                                    |
| ---------- | ------------ | -------------------------------------------------------- |
| name       | text         | required, max 100 chars                                  |
| reordered  | boolean      | toggled from the list, default false                     |
| level      | fixed values | low, medium, high (low is shown in red)                  |
| category   | relation     | Electrodes, Wire, Nozzles, Gas cylinders                 |
| quantity   | number       | integer >= 0 (extra field)                               |
| user       | relation     | the owner of the item (from week 11)                     |

Planned extra fields for gas cylinders: supplier, date taken, contract/pressure-test expiry date.

Sample data used across all stages:

1. E6013 electrodes 2.5 mm, active (needs reorder), low
2. ER70S-6 MIG wire 0.8 mm, done (reordered), medium
3. Corgon cylinder 18 L, active (needs reorder), high

## How to run

Stage 2 (plain JavaScript): open `mockup/index.html` in a browser and check the console (F12).

From Stage 6 on, the app needs the mock API and the Vite dev server, in two terminals:

    cd frontend
    npm install
    npm run api    # terminal 1, json-server on http://localhost:3001
    npm run dev    # terminal 2, app on http://localhost:5173

The API address is read from `VITE_API_URL` (see `frontend/.env.example`).

## Stage 2: data logic

Plain JavaScript, no DOM. `inventory.js` holds the array and the functions that read and change it (list, count, search, add with validation, toggle, delete). None of them modify the input array. Results are printed in the browser console (F12).

## Stage 4: components
The list is rendered from the data, through two components:
- `ItemList` receives the whole array and renders one card per item
- `ItemCard` receives a single item through props and displays it

## Stage 5: local state and events
The list lives in React state. Checking and deleting items works from the page,
and the counters in the header follow automatically. A button in the
header switches between light and dark mode. Changes are lost on refresh,
which is what stage 6 and stage 10 fix.

## Stage 6: data from a mock API
The list is served by json-server 0.17.4 from `frontend/db.json` (resource `items`).
The app fetches it on load (`useEffect`) and shows three states: loading, success and
an error message that says what to do when the API is down. All HTTP calls live in
`src/api.js`, and the API address comes from `VITE_API_URL`.

## Stage 7: form and validation
Items can be added from the page with a controlled form (`ItemForm`): name (required,
max 100 characters), stock level, category and quantity (integer >= 0). The form
validates before sending and shows errors next to the fields, not with `alert`. Every
change (add, toggle reordered, delete) goes to the API first (POST, PATCH, DELETE), and
the list is updated with what the server returned. The button is disabled while saving,
and the typed text is kept if saving fails. `tw.json` and the `data-testid` attributes
are the hooks for the automatic checks.

## Stage 8: routing and detail page
Three pages behind React Router, inside a shared `Layout` (header, `NavLink` navigation,
theme toggle, footer): the inventory list at `/`, a detail page at `/items/:id` that reads
the id with `useParams` and fetches exactly that item, and an about page at `/despre`,
plus a 404 page for unknown addresses. A missing item shows an error message and a link
back. Component styles moved to CSS Modules (`*.module.css` next to each component);
`src/index.css` only holds the color variables and the shared classes.

## AI usage

| Tool       | Used for                                                  |
| ---------- | --------------------------------------------------------- |
| Claude     | Overall program integrity, data manipulation for visual interfaces|

## Status

- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: Vite and React project
- [x] Stage 4: components rendered from data
- [x] Stage 5: local state and events
- [x] Stage 6: data from a mock API
- [x] Stage 7: form and validation
- [x] Stage 8: routing and detail page
- [ ] Stage 9: own backend with Express

## Checklists

Line ranges refer to the commit of the stage; replace them with GitHub permalinks after pushing.

### Stage 6: checklist

| ID | Requirement | Where (permalink) | How to check |
| -- | ----------- | ----------------- | ------------ |
| S6-R1 | `npm run api` starts, route shows JSON | frontend/package.json, frontend/db.json | open localhost:3001/items |
| S6-R2 | data no longer in React code | frontend/src/pages/ItemsPage.jsx#L8 (`useState([])`) | read |
| S6-R3 | loading message while waiting | frontend/src/pages/ItemsPage.jsx#L73-L77 | `--delay 4000` |
| S6-R4 | error message when API is down | frontend/src/pages/ItemsPage.jsx#L13-L31 | stop `npm run api`, refresh |
| S6-R5 | fetch only in api.js, URL from env | frontend/src/api.js#L3-L16, frontend/.env.example | search for `fetch` |
| S6-R6 | README Stage 6 section + AI log | README.md, AI-Log/etapa-06.md | read |
| S6-R7 | commit "Stage 6" pushed | link to the commit | commit history |

### Stage 7: checklist

| ID | Requirement | Where (permalink) | How to check |
| -- | ----------- | ----------------- | ------------ |
| S7-R1 | controlled form: value + onChange on every field | frontend/src/components/ItemForm.jsx#L57-L118 | read |
| S7-R2 | empty name shows an error, nothing is sent | frontend/src/components/ItemForm.jsx#L16-L26 (`validate`) | submit empty, watch Network |
| S7-R3 | added item shows in the list and survives refresh | frontend/src/pages/ItemsPage.jsx#L34-L37 (`handleAdd`), frontend/src/api.js#L26-L28 | add, refresh |
| S7-R4 | toggle and delete survive refresh | frontend/src/pages/ItemsPage.jsx#L39-L56 | toggle/delete, refresh |
| S7-R5 | button disabled while sending, form cleared only on success | frontend/src/components/ItemForm.jsx#L28-L54 | `--delay 3000`; stop API and submit |
| S7-R6 | tw.json and the data-testid attributes from table 7.3 | tw.json, frontend/src/components/ItemCard.jsx#L13-L50 | querySelectorAll in the console |
| S7-R7 | README Stage 7 section + AI log | README.md, AI-Log/etapa-07.md | read |
| S7-R8 | commit "Stage 7" pushed | link to the commit | commit history |

### Stage 8: checklist

| ID | Requirement | Where (permalink) | How to check |
| -- | ----------- | ----------------- | ------------ |
| S8-R1 | header navigation changes page without reload | frontend/src/App.jsx#L13-L17, frontend/src/components/Layout.jsx#L29-L36 | click links, watch Network |
| S8-R2 | click on an item opens its detail page | frontend/src/components/ItemCard.jsx#L23-L29, frontend/src/pages/ItemDetailPage.jsx | click a title |
| S8-R3 | refresh on the detail URL works; missing id shows an error | frontend/src/pages/ItemDetailPage.jsx#L8-L51 | refresh /items/1, open /items/999 |
| S8-R4 | unknown URL shows the app 404 page | frontend/src/App.jsx#L17 (`path="*"`), frontend/src/pages/NotFoundPage.jsx | open /ceva |
| S8-R5 | each component has its .module.css; index.css only shared styles | frontend/src/components, frontend/src/pages, frontend/src/index.css | read |
| S8-R6 | data-testid attributes from tables 7.3 and 8.2; detail route `/<resource>/:id` | Layout.jsx, ItemCard.jsx, ItemDetailPage.jsx, NotFoundPage.jsx | querySelector in the console |
| S8-R7 | README Stage 8 section + AI log | README.md, AI-Log/etapa-08.md | read |
| S8-R8 | commit "Stage 8" pushed | link to the commit | commit history |
