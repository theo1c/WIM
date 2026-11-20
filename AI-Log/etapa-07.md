# Stage 7: AI log

## Tools
- Claude (claude.ai)

## Key requests
### 1. The add form with validation
- Asked: a controlled form for the item fields (name, stock level, category, quantity) with the extra validations from my data model.
- Got: ItemForm with value/onChange on every field, validate() (name required and max 100 characters, quantity an integer >= 0), errors shown next to the form, noValidate, disabled button while saving, fields cleared only after a successful save.

### 2. Toggle and delete on the server
- Asked: to move the toggle and delete handlers to the API.
- Got: a shared request() function with POST, PATCH and DELETE helpers (and the 204 case), handlers that wait for the server and update the list with the returned object.

### 3. Checks for the automatic verification
- Asked: tw.json and the data-testid attributes for my theme.
- Got: tw.json (items, name, reordered, sample with level, category, quantity) and the data-testid attributes on the form, the cards, the list and the messages.
