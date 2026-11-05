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

Open `index.html` in a browser. No build step, no server. Open the console (F12) to see the Stage 2 output.

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