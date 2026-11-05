import { useState } from "react";
import ItemList from "./components/ItemList.jsx";

const INITIAL_ITEMS = [
  { id: 1, name: "E6013 electrodes 2.5 mm", reordered: false, level: "low", category: "Electrodes", quantity: 2 },
  { id: 2, name: "ER70S-6 MIG wire 0.8 mm", reordered: true, level: "medium", category: "Wire", quantity: 4 },
  { id: 3, name: "Corgon cylinder 18 L", reordered: false, level: "high", category: "Gas cylinders", quantity: 6 },
];

function initialTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [theme, setTheme] = useState(initialTheme);

  function handleToggleReordered(id) {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, reordered: !i.reordered } : i))
    );
  }

  function handleDelete(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function handleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }

  const needReorder = items.filter((i) => !i.reordered).length;

  return (
    <>
      <header className="app-header">
        <button
          className="theme-toggle"
          onClick={handleTheme}
          aria-pressed={theme === "dark"}
        >
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
        <h1>WeldStock</h1>
        <p>Track electrodes, wire spools and contact tips, and get warned before they run out.</p>
        <p className="app-count">
          {items.length} items, {needReorder} need reorder
        </p>
      </header>
      <main className="container">
        <section className="panel">
          <h2>My inventory</h2>
          <ItemList
            items={items}
            onToggle={handleToggleReordered}
            onDelete={handleDelete}
          />
        </section>
      </main>
      <footer className="app-footer">Web Technologies project</footer>
    </>
  );
}