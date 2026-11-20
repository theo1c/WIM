// ADAPT: description of the app and the technologies used.
export default function AboutPage() {
  return (
    <section className="panel">
      <h2>About WeldStock</h2>
      <p>
        WeldStock is a mini-ERP for auto repair shops and metal fabrication
        workshops. It tracks fast-consuming welding materials (electrodes, wire
        spools, contact tips) and warns visually, in red, when an item is close
        to running out.
      </p>
      <p>Stack: React, Vite, React Router, json-server (Node.js, Express and MariaDB in later stages), Docker.</p>
    </section>
  );
}
