# Stage 8: AI log

## Tools
- Claude (claude.ai)

## Key requests
### 1. Pages and routes
- Asked: to split the app into pages with React Router for WeldStock: list, detail at /items/:id, about, and a 404 page.
- Got: BrowserRouter in main.jsx, the route map in App.jsx, ItemsPage, ItemDetailPage (useParams, fetchItem, loading and error states), AboutPage, NotFoundPage.

### 2. Shared layout and navigation
- Asked: one layout for all pages, keeping the dark/light button from stage 5.
- Got: Layout with NavLink (end on the first link) and Outlet, the theme toggle moved into the header, the item title turned into a link to the detail page.

### 3. CSS Modules
- Asked: to move the component styles from App.css next to their components.
- Got: one .module.css per component and page, index.css kept only for variables and shared classes, the low-stock alert made with a CSS class set from JSX instead of :has().
