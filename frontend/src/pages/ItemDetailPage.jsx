import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchItem } from "../api.js";
import { LEVEL_LABELS, UNITS } from "../constants.js";
import styles from "./ItemDetailPage.module.css";

export default function ItemDetailPage() {
  const { id } = useParams(); // text from the URL, for example "3"
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Runs again if the id in the address changes
  useEffect(() => {
    let ignore = false;
    fetchItem(id)
      .then((data) => {
        if (!ignore) {
          setItem(data);
          setError(null); // an error from a previous id is no longer valid
        }
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <p className="info" data-testid="loading">
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <section className="panel">
        <p className="error" data-testid="error">
          The item could not be loaded: {error}
        </p>
        <Link to="/">Back to inventory</Link>
      </section>
    );
  }

  return (
    <section className={`panel ${styles.detail}`} data-testid="detail">
      <Link to="/" className={styles.back}>
        Back to inventory
      </Link>
      <h2 className={item.reordered ? styles.done : undefined} data-testid="detail-title">
        {item.name}
      </h2>
      <dl className={styles.fields}>
        <dt>Category</dt>
        <dd>{item.category}</dd>
        <dt>Stock level</dt>
        <dd>
          <span className={`badge badge-${item.level}`}>
            {LEVEL_LABELS[item.level]}
          </span>
        </dd>
        <dt>Quantity</dt>
        <dd>
          {item.quantity} {UNITS[item.category] ?? "pcs"}
        </dd>
        <dt>Status</dt>
        <dd>{item.reordered ? "Reordered" : "Needs reorder"}</dd>
        <dt>ID</dt>
        <dd>{item.id}</dd>
      </dl>
    </section>
  );
}
