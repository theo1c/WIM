const STOCK_LABELS = { low: "low", medium: "medium", high: "high" };

const UNITS = {
  Electrodes: "packs",
  Wire: "spools",
  Nozzles: "packs",
  "Gas cylinders": "cylinders",
};

export default function ItemCard({ item, onToggle, onDelete }) {
  return (
    <li className={item.reordered ? "item-card done" : "item-card"}>
      <label className="item-main">
        <input
          type="checkbox"
          checked={item.reordered}
          onChange={() => onToggle(item.id)}
        />
        <div>
          <h3>{item.name}</h3>
          <span className={`badge badge-${item.level}`}>
            Stock: {STOCK_LABELS[item.level]}
          </span>
          <p className="meta">
            {item.quantity} {UNITS[item.category] ?? "pcs"}
          </p>
        </div>
      </label>
      <div className="item-actions">
        <span className="status">
          {item.reordered ? "Reordered" : "Needs reorder"}
        </span>
        <button
          className="btn-danger"
          onClick={() => onDelete(item.id)}
          aria-label={`Delete ${item.name}`}
        >
          Delete
        </button>
      </div>
    </li>
  );
}