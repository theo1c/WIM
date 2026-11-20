import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ItemsPage from "./pages/ItemsPage.jsx";
import ItemDetailPage from "./pages/ItemDetailPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// Route map. Layout wraps every page.
// ADAPT: the detail route is /<resource>/:id, with the resource from tw.json.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ItemsPage />} />
        <Route path="/items/:id" element={<ItemDetailPage />} />
        <Route path="/despre" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
