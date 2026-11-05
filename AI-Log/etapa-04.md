# Stage 4: AI log

## Tools
- Claude (claude.ai)

## Key requests
### 1. Components for the inventory list
- Asked: to split the raw JSON list into ItemList and ItemCard components, based on the stage guide and my project.
- Got: ItemCard (receives one item through props), ItemList (map with key={item.id}, early return for the empty list), updated App.jsx.

