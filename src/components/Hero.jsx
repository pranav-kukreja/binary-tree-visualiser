import "../styles/hero.css";

export default function Hero() {
  return (
    <section className="hero ">
      <h1 className="hero-title gradient-text">Binary Tree Visualiser</h1>
      <p className="hero-subtitle">
        Explore various tree traversal techniques with live visualization.
      </p>
      <button
        className="hero-btn"
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }
      >
        Start Visualizing
      </button>
    </section>
  );
}
