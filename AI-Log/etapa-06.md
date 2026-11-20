# Stage 6: AI log

## Tools
- Claude (claude.ai)

## Key requests
### 1. Mock API and data loading
- Asked: to adapt the stage 6 guide to my WeldStock project (items, reordered, level, category, quantity).
- Got: db.json with six items and the items resource, json-server 0.17.4 and the api script, api.js with the API address read from VITE_API_URL and the res.ok check, .env.example.

### 2. Loading, success and error states
- Asked: the useEffect that loads the list and the three states on screen.
- Got: loading, items and error state in the page, effect cleanup with the ignore flag, an error message that tells what to do when the API is down.

### 3. Fixing the missing light-theme variables
- Asked: why the colors were not defined in the light theme after the CSS rewrite.
- Got: the :root variables (accent, low/medium/high, error colors) moved into the global stylesheet.
