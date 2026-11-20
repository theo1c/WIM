import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="panel" data-testid="not-found">
      <h2>Page not found</h2>
      <p className="info">The requested address does not lead anywhere.</p>
      <Link to="/">Back to inventory</Link>
    </section>
  );
}
