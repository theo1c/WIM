import { Link } from "react-router-dom";
import { LEVEL_LABELS, UNITS } from "../constants.js";
import styles from "./ItemCard.module.css";

export default function ItemCard({ item, onToggle, onDelete }) {
  // low stock that has not been reordered yet gets the red alert
  const alert = item.level === "low" && !item.reordered;
  const classes = [styles.card];
  if (item.reordered) classes.push(styles.done);
  if (alert) classes.push(styles.alert);

  return (
    <li className={classes.join(" ")} data-testid="item" data-id={item.id}>
      <div className={styles.main}>
        <input
          type="checkbox"
          checked={item.reordered}
          onChange={() => onToggle(item.id)}
          aria-label={`Mark ${item.name} as reordered`}
          data-testid="item-toggle"
        />
        <div>
          <Link
            to={`/items/${item.id}`}
            className={styles.title}
            data-testid="item-link"
          >
            {item.name}
          </Link>
          <span className={`badge badge-${item.level}`}>
            Stock: {LEVEL_LABELS[item.level]}
          </span>
          <p className={styles.meta}>
            {item.quantity} {UNITS[item.category] ?? "pcs"}
          </p>
        </div>
      </div>
      <div className={styles.actions}>
        <span className={styles.status}>
          {item.reordered ? "Reordered" : "Needs reorder"}
        </span>
        <button
          className="btn-danger"
          onClick={() => onDelete(item.id)}
          aria-label={`Delete ${item.name}`}
          data-testid="item-delete"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
