import ItemCard from "./ItemCard.jsx";
import styles from "./ItemList.module.css";

export default function ItemList({ items, onToggle, onDelete }) {
  if (items.length === 0) {
    return (
      <p className="empty" data-testid="empty">
        No items in stock yet.
      </p>
    );
  }

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
