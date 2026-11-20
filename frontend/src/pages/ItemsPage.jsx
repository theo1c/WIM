import { useEffect, useState } from "react";
import ItemList from "../components/ItemList.jsx";
import ItemForm from "../components/ItemForm.jsx";
import { createItem, deleteItem, fetchItems, updateItem } from "../api.js";
import styles from "./ItemsPage.module.css";

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Runs once, after the first render
  useEffect(() => {
    let ignore = false; // do not set state if the page was left in the meantime
    async function load() {
      try {
        const data = await fetchItems();
        if (!ignore) setItems(data);
      } catch (err) {
        if (!ignore) {
          setError(`Could not load the data: ${err.message}. Is the API running (npm run api)?`);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  // Server first, then state: only what was saved reaches the screen
  async function handleAdd(item) {
    const created = await createItem(item); // the server returns the item with its id
    setItems((prev) => [...prev, created]);
  }

  async function handleToggleReordered(id) {
    const item = items.find((i) => i.id === id);
    try {
      const updated = await updateItem(id, { reordered: !item.reordered });
      setItems((prev) => prev.map((i) => (i.id === id ? updated : i)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteItem(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  const needReorder = items.filter((i) => !i.reordered).length;
  // if loading failed, the list would only say "no items", which is misleading
  const loadFailed = Boolean(error) && items.length === 0;

  return (
    <div className={styles.grid}>
      <section className="panel">
        <h2>Add item</h2>
        <ItemForm onAdd={handleAdd} />
      </section>
      <section className="panel">
        <h2>My inventory</h2>
        <p className={styles.summary}>
          {items.length} items, {needReorder} need reorder
        </p>
        {loading && (
          <p className="info" data-testid="loading">
            Loading...
          </p>
        )}
        {error && (
          <p className="error" data-testid="error">
            {error}
          </p>
        )}
        {!loading && !loadFailed && (
          <ItemList
            items={items}
            onToggle={handleToggleReordered}
            onDelete={handleDelete}
          />
        )}
      </section>
    </div>
  );
}
