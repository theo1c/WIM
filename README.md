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
-