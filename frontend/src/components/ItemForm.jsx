import { useState } from "react";
import { CATEGORIES, LEVELS } from "../constants.js";
import styles from "./ItemForm.module.css";

const NAME_MAX = 100;

// Controlled form: React state is the source of truth for the fields
export default function ItemForm({ onAdd }) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("medium");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  function validate() {
    const n = name.trim();
    if (n === "") return "Name is required.";
    if (n.length > NAME_MAX) return `Name has at most ${NAME_MAX} characters.`;
    if (String(quantity).trim() === "") return "Quantity is required.";
    const q = Number(quantity);
    if (!Number.isInteger(q) || q < 0) {
      return "Quantity must be a whole number, 0 or more.";
    }
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault(); // stops the page reload
    const message = validate();
    if (message) {
      setError(message);
      return;
    }
    setError("");
    setSending(true);
    try {
      await onAdd({
        name: name.trim(),
        reordered: false,
        level,
        category,
        quantity: Number(quantity),
      });
      setName("");
      setLevel("medium");
      setCategory(CATEGORIES[0]);
      setQuantity("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate data-testid="form">
      <label>
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="E.g. E6013 electrodes 2.5 mm"
          maxLength={NAME_MAX}
          aria-invalid={Boolean(error)}
          data-testid="form-title"
        />
      </label>
      <label>
        Stock level
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          data-testid="form-level"
        >
          {LEVELS.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        Category
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          data-testid="form-category"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
      <label>
        Quantity
        <input
          type="number"
          min="0"
          step="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="E.g. 5"
          data-testid="form-quantity"
        />
      </label>
      {error && (
        <p className="error" data-testid="form-error">
          {error}
        </p>
      )}
      <button type="submit" className="btn" disabled={sending} data-testid="form-submit">
        {sending ? "Saving..." : "Add item"}
      </button>
    </form>
  );
}
