import ItemCard from "./ItemCard.jsx";

export default function ItemList({ items, onToggle, onDelete }) {
  if (items.length === 0) {
    return <p className="empty">No items in stock yet.</p>;
  }

  return (
    <ul className="item-list">
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