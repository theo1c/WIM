# Stage 5: AI log

## Tools
- Claude (claude.ai)

## Key requests
### 1. State and handlers for the inventory
- Asked: to adapt the stage 5 guide to my WeldStock project (items, reordered, ItemList, ItemCard).
- Got: items kept in useState in App, handleToggleReordered and handleDelete using map/filter, functions passed down through props, controlled checkbox, accessible delete button.

### 2. Light/dark theme toggle
- Asked: a header button that switches between light and dark mode.
- Got: a theme state, data-theme attribute on <html>, CSS variables redefined per attribute.
